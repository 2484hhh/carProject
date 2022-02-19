# 项目介绍

​	租车小程序，使用`typescript`进行小程序前端开发，后端采用go微服务架构，最后使用`k8s`+`docker`在云端进行部署

# 微服务

​	将一整个的服务划分成几个模块，如何划分很重要，尽量保证模块之间的高内聚低耦合，具有快速开发、独立部署、错误隔离的特性，因为采用微服务增加了系统的复杂性，所以要采用自动化部署、负载均衡、出错处理、链路跟踪、服务发现、服务治理等技术。

# 后端微服务划分

![image-20220106170931912](E:\typroa_pic\image-20220106170931912.png)

​		一定要注意不同领域要有明确的划分，不要有另一个领域的变量和状态入侵到本领域。如是否能开始一个行程应该放在行程模块，而不应该放在资格认证模块。划分结果如下

![image-20220110141405012](E:\typroa_pic\image-20220110141405012.png)

# 1.`auth`登录服务

​	服务定义采用`GRPC`引领全栈开发，通过`GRPC`定义服务，定义数据结构使得前后端联调更方便。

**微信小程序登录流程**

![image-20220112170149894](E:\typroa_pic\image-20220112170149894.png)



## 1.登录服务

首先微信登陆采用Go语言第三方库`weapp`来获取用户唯一标识`OpenID`，将其`Decode`成`AccountID`，并采用`MongoDB`存储。然后进行了测试，测试用docker每次启一个干净的`MongoDB`来固定测试结果，采用表格驱动测试。

同时使用`JWT`保存登录态，（为什么不使用session？性能问题，服务器需要维护Session列表，且每个请求都要查找Session表）

**`JWT(JSON Web Token)`**

1. 不需要维护任何数据
2. 验证请求时，直接查验签名

采用`RSA`非对称密钥签名`JWT`

![image-20220117100750349](E:\typroa_pic\image-20220117100750349.png)

```go
// Login logs a user in
func (s *Service) Login(c context.Context, request *authpb.LoginRequest) (*authpb.LoginResponse, error) {
	openId, err := s.OpenIDResolver.Resolve(request.Code)
	if err != nil {
		return nil, status.Errorf(codes.Unavailable, "cannot resolve openid: $v", err)
	}

	accountID, err := s.Mongo.ResolveAccountId(c, openId)
	if err != nil {
		s.Logger.Error("cannot resolve account id", zap.Error(err))
		return nil, status.Errorf(codes.Internal, "")
	}

	tkn, err := s.TokenGenerator.GenerateToken(accountID.String(), s.TokenExpire)
	if err != nil {
		s.Logger.Error("cannot generate token", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}

	return &authpb.LoginResponse{
		AccessToken: tkn,
		ExpiresIn_:  int32(s.TokenExpire.Seconds()),
	}, nil
}

```



## 2.身份验证

使用`contex`携带`accountID`，以此条件基于`grpc interceptor`实现一个登陆状态的拦截器，如果不携带`accountID`，则拒绝服务。同时将`AccountID,TripID,CarID`等`string`类型定义成各自的强类型，使更容易区分。



# 2.`rental`行程服务

## 2.1 行程服务

因为行程领域和车辆管理以及资格认证联系较为紧密，所以将这三部分做成一个微服务。但三个领域之间的界限还是要分清楚。同时要避免各个领域间变量的入侵，所以在行程领域分别添加了两个`ACL`层防止车辆管理和资格认证的入侵。

![image-20220119161043399](E:\typroa_pic\image-20220119161043399.png)

### 数据库部分的CRUD

​	首先完成服务中行程数据的`CRUD`，先写出数据库部分的`CRUD`， 其中行程更新部分，因为同一个账户几乎不会出现同时对一个行程进行更新，所以利用请求的时间设置一个乐观锁，如果没有发生冲突，那么发送更新请求时，该时间戳不会发生变化，则更新成功。如果冲突，则重新get一次行程，拿到新的时间戳，再去更新行程。

```go
const (
	tripField      = "trip"
	accountIDField = tripField + ".accountid"
	statusField    = tripField + ".status"
)

// Mongo defines a mongo dao
type Mongo struct {
	col *mongo.Collection
}

// NewMongo creates a new mongo dao
func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		col: db.Collection("trip"),
	}
}

// TripRecord defines a trip record in mongodb
type TripRecord struct {
	mgutil.IDField        `bson:"inline"`
	mgutil.UpdatedAtField `bson:"inline"`
	Trip                  *rentalpb.Trip `bson:"trip"`
}

func (m *Mongo) CreateTrip(c context.Context, trip *rentalpb.Trip) (*TripRecord, error) {
	r := &TripRecord{
		Trip: trip,
	}
	r.ID = mgutil.NewObjID()
	r.UpdatedAt = mgutil.UpdatedAt()
	_, err := m.col.InsertOne(c, r)
	if err != nil {
		return nil, err
	}

	return r, nil
}

func (m *Mongo) GetTrip(c context.Context, id id.TripID, accountID id.AccountID) (*TripRecord, error) {
	objID, err := objid.FromID(id)
	if err != nil {
		return nil, fmt.Errorf("invalid id:%v", err)
	}
	res := m.col.FindOne(c, bson.M{
		mgutil.IDFieldName: objID,
		accountIDField:     accountID,
	})
	if err = res.Err(); err != nil {
		return nil, err
	}
	var tr TripRecord

	err = res.Decode(&tr)
	if err != nil {
		return nil, fmt.Errorf("cannot decode :%v", err)
	}
	return &tr, nil

}
func (m *Mongo) GetTrips(c context.Context, accountID id.AccountID, status rentalpb.TripStatus) ([]*TripRecord, error) {
	filter := bson.M{
		accountIDField: accountID.String(),
	}
	if status != rentalpb.TripStatus_TS_NOT_SPECIFIED {
		filter[statusField] = status
	}
	res, err := m.col.Find(c, filter)
	if err != nil {
		return nil, err
	}

	var trips []*TripRecord
	for res.Next(c) {
		var trip TripRecord
		err = res.Decode(&trip)
		if err != nil {
			return nil, err
		}
		trips = append(trips, &trip)
	}
	return trips, nil
}

// UpdateTrip updates a trip
func (m *Mongo) UpdateTrip(c context.Context, tid id.TripID, aid id.AccountID, updatedAt int64, trip *rentalpb.Trip) error {
	objID, err := objid.FromID(tid)
	if err != nil {
		return fmt.Errorf("invalid id:%v", err)
	}

	newUpdatedAt := mgutil.UpdatedAt()
	res, err := m.col.UpdateOne(c, bson.M{
		mgutil.IDFieldName:        objID,
		accountIDField:            aid.String(),
		mgutil.UpdatedAtFieldName: updatedAt,
	}, mgutil.Set(bson.M{
		tripField:                 trip,
		mgutil.UpdatedAtFieldName: newUpdatedAt,
	}))
	if err != nil {
		return err
	}
	if res.MatchedCount == 0 {
		return mongo.ErrNoDocuments
	}
	return nil
}
```



### 业务逻辑的CRUD

#### 行程的创建

​		首先通过`ACL`层验证驾驶证身份，`ACL`会返回一个`IdentityId`保存起来，用于标记最终是哪个用户创建了行程，如果出了事情，可以用来追溯。

​		然后通过另一个`ACL`层验证检查车辆状态，同时检查人的位置，避免人和车相隔太远。

​		然后创建行程，写入数据库，开始计费。

​		最后开一个后台协程开锁，因为开锁是一个复杂过程。

```go
func (s *Service) CreateTrip(ctx context.Context, request *rentalpb.CreateTripRequest) (*rentalpb.TripEntity, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}
	if request.CarId == "" || request.Start == nil {
		return nil, status.Error(codes.InvalidArgument, "")
	}

	// 验证驾驶者身份
	iId, err := s.ProfileManger.Verify(ctx, aid)
	if err != nil {
		return nil, status.Errorf(codes.FailedPrecondition, err.Error())
	}

	//先检查车辆状态
	carID := id.CarID(request.CarId)
	err = s.CarManager.Verify(ctx, carID, request.Start)
	if err != nil {
		return nil, status.Errorf(codes.FailedPrecondition, err.Error())
	}

	// 创建行程：写入数据库，开始计费
	ls := s.calcCurrentStatus(ctx, &rentalpb.LocationStatus{
		Location:     request.Start,
		TimestampSec: nowFunc(),
	}, request.Start)

	tr, err := s.Mongo.CreateTrip(ctx, &rentalpb.Trip{
		AccountId:  aid.String(),
		CarId:      carID.String(),
		IdentityId: iId.String(),
		Status:     rentalpb.TripStatus_IN_PROGRESS,
		Start:      ls,
		Current:    ls,
	})
	if err != nil {
		s.Logger.Warn("cannot create trip", zap.Error(err))
		return nil, status.Errorf(codes.AlreadyExists, "")
	}

	//车辆开锁
	go func() {
		err := s.CarManager.Unlock(context.Background(), carID, aid, objid.ToTripID(tr.ID), request.AvatarUrl)
		if err != nil {
			s.Logger.Error("cannot unlock car", zap.Error(err))
		}
	}()

	return &rentalpb.TripEntity{
		Id:   tr.ID.Hex(),
		Trip: tr.Trip,
	}, nil

}
```

#### 行程的获取

```go
// GetTrip gets a trip
func (s *Service) GetTrip(ctx context.Context, request *rentalpb.GetTripRequest) (*rentalpb.Trip, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}

	tr, err := s.Mongo.GetTrip(ctx, id.TripID(request.Id), aid)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "")
	}
	return tr.Trip, nil
}

// GetTrips get trips
func (s *Service) GetTrips(ctx context.Context, request *rentalpb.GetTripsRequest) (*rentalpb.GetTripsResponse, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}
	trips, err := s.Mongo.GetTrips(ctx, aid, request.Status)
	if err != nil {
		s.Logger.Error("cannot get trips", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}
	res := &rentalpb.GetTripsResponse{}
	for _, tr := range trips {
		res.Trips = append(res.Trips, &rentalpb.TripEntity{
			Id:   tr.ID.Hex(),
			Trip: tr.Trip,
		})
	}
	return res, nil
}

```

#### 行程的更新

利用`tr.UpdatedAt`设置一个乐观锁，如果没有发生冲突，那么发送更新请求时，该时间戳不会发生变化，则更新成功。如果冲突，则重新get一次行程，拿到新的时间戳，再去更新行程

```go
// UpdateTrip update a trip
func (s *Service) UpdateTrip(ctx context.Context, request *rentalpb.UpdateTripsRequest) (*rentalpb.Trip, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.Unauthenticated, "")
	}

	tid := id.TripID(request.Id)

	//begin trans -----no use
	tr, err := s.Mongo.GetTrip(ctx, tid, aid)
	if err != nil {
		return nil, status.Error(codes.NotFound, "")
	}

	if tr.Trip.Status == rentalpb.TripStatus_FINISHED {
		return nil, status.Error(codes.FailedPrecondition, "cannot update a finished trip")
	}

	if tr.Trip.Current == nil {
		s.Logger.Error("trip without current set", zap.String("id", tid.String()))
		return nil, status.Error(codes.Internal, "")
	}

	cur := tr.Trip.Current.Location
	if request.Current != nil {
		cur = request.Current
	}

	tr.Trip.Current = s.calcCurrentStatus(ctx, tr.Trip.Current, cur)

	if request.EndTrip {
		tr.Trip.End = tr.Trip.Current
		tr.Trip.Status = rentalpb.TripStatus_FINISHED
		err := s.CarManager.Lock(ctx, id.CarID(tr.Trip.CarId))
		if err != nil {
			return nil, status.Errorf(codes.FailedPrecondition, "cannot lock car: %v", err)
		}

	}

	err = s.Mongo.UpdateTrip(ctx, tid, aid, tr.UpdatedAt, tr.Trip)
	//commit  ----no use
	if err != nil {
		return nil, status.Error(codes.Aborted, "")
	}
	return tr.Trip, nil
}
```



## 2.2  身份服务

​		身份信息在本服务中更适合值类型（account_id=>Identity的映射关系），不适合实体（实体有生命周期，可以创建、更新、删除等），初始身份信息为空。

### 数据库的CRUD

```go
const (
	accountIDField      = "accountid"
	profileIDField      = "profile"
	identityStatusField = profileIDField + ".identitystatus"
	photoblobidField	= "photoblobid"
)

// Mongo defines a mongo dao
type Mongo struct {
	col *mongo.Collection
}

// NewMongo creates a new mongo dao
func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		col: db.Collection("profile"),
	}
}

// ProfileRecord  defines the profile record in db
type ProfileRecord struct {
	AccountID   string            `bson:"accountid"`
	Profile     *rentalpb.Profile `bson:"profile"`
	PhotoBlobID string            `bson:"photoblobid"`
}

// GetProfile get profile
func (m *Mongo) GetProfile(c context.Context, aid id.AccountID) (*ProfileRecord, error) {
	res := m.col.FindOne(c, byAccountID(aid))
	if err := res.Err(); err != nil {
		return nil, err
	}
	var pr ProfileRecord
	err := res.Decode(&pr)
	if err != nil {
		return nil, fmt.Errorf("cannot decode profile record : %v", err)
	}
	return &pr, nil
}

func (m *Mongo) UpdateProfile(c context.Context, aid id.AccountID, p *rentalpb.Profile, prevStatus rentalpb.IdentityStatus) error {
	filter:=bson.M{
		identityStatusField: prevStatus,
	}
	if prevStatus==rentalpb.IdentityStatus_UNSUBMITTED{
		filter =mgutil.ZeroOrDoesNotExist(identityStatusField,prevStatus)
	}
	filter[accountIDField]=aid.String()

	_, err := m.col.UpdateOne(c, filter, mgutil.Set(bson.M{
		accountIDField: aid.String(),
		profileIDField: p,
	}), options.Update().SetUpsert(true))
	return err
}

func (m *Mongo)UpdateProfilePhoto(c context.Context,aid id.AccountID,bid id.BlobID)error{
	_, err := m.col.UpdateOne(c, bson.M{
		accountIDField:      aid.String(),
	}, mgutil.Set(bson.M{
		accountIDField: aid.String(),
		photoblobidField: bid.String(),
	}), options.Update().SetUpsert(true))
	return err
}

func byAccountID(aid id.AccountID) bson.M {
	return bson.M{
		accountIDField: aid,
	}
}
```

### 身份信息的CRUD

#### 用户信息更新

```go
// Service defines a profile service.
type Service struct {
	BlobClient        blobpb.BlobServiceClient
	PhotoGetExpire    time.Duration
	PhotoUploadExpire time.Duration
	IdentityResolver  IdentityResolver
	Mongo             *dao.Mongo
	Logger            *zap.Logger
	*rentalpb.UnimplementedProfileServiceServer
}

// IdentityResolver resolves identity from given photo.
type IdentityResolver interface {
	Resolve(c context.Context, photo []byte) (*rentalpb.Identity, error)
}

// GetProfile gets profile for the current account.
func (s *Service) GetProfile(ctx context.Context, request *rentalpb.GetProfileRequest) (*rentalpb.Profile, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}
	pr, err := s.Mongo.GetProfile(ctx, aid)
	if err != nil {
		code := s.logAndConvertProfileErr(err)
		if code == codes.NotFound {
			return &rentalpb.Profile{}, nil
		}
		return nil, status.Error(code, "")
	}
	if pr.Profile == nil {
		return &rentalpb.Profile{}, nil
	}
	return pr.Profile, nil
}

// SubmitProfile submits a profile.
func (s *Service) SubmitProfile(ctx context.Context, identity *rentalpb.Identity) (*rentalpb.Profile, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}

	p := &rentalpb.Profile{
		Identity:       identity,
		IdentityStatus: rentalpb.IdentityStatus_PENDING,
	}
	err = s.Mongo.UpdateProfile(ctx, aid, p, rentalpb.IdentityStatus_UNSUBMITTED)
	if err != nil {
		s.Logger.Error("cannot update profile", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}
	go func() {
		time.Sleep(3 * time.Second)
		err := s.Mongo.UpdateProfile(context.Background(), aid, &rentalpb.Profile{
			Identity:       identity,
			IdentityStatus: rentalpb.IdentityStatus_VERIFIED,
		}, rentalpb.IdentityStatus_PENDING)
		if err != nil {
			s.Logger.Error("cannot verify identity", zap.Error(err))
		}
	}()
	return p, nil
}

// ClearProfile clears profile for an account.
func (s *Service) ClearProfile(ctx context.Context, request *rentalpb.ClearProfileRequest) (*rentalpb.Profile, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}
	p := &rentalpb.Profile{}
	err = s.Mongo.UpdateProfile(ctx, aid, p, rentalpb.IdentityStatus_VERIFIED)
	if err != nil {
		s.Logger.Error("cannot update profile", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}
	return p, nil
}

// GetProfilePhoto gets profile photo.
func (s *Service) GetProfilePhoto(ctx context.Context, request *rentalpb.GetProfilePhotoRequest) (*rentalpb.GetProfilePhotoResponse, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}

	pr, err := s.Mongo.GetProfile(ctx, aid)
	if err != nil {
		return nil, status.Error(s.logAndConvertProfileErr(err), "")
	}

	if pr.PhotoBlobID == "" {
		return nil, status.Error(codes.NotFound, "")
	}
	br,err:=s.BlobClient.GetBlobURL(ctx, &blobpb.GetBlobURLRequest{
		Id:         pr.PhotoBlobID,
		TimeoutSec: int32(s.PhotoGetExpire.Seconds()),
	})
	if err!=nil{
		s.Logger.Error("cannot get blob",zap.Error(err))
		return nil,status.Error(codes.Internal,"")
	}

	return &rentalpb.GetProfilePhotoResponse{
		Url: br.Url,
	},nil
}

// CreateProfilePhoto creates profile photo.
func (s *Service) CreateProfilePhoto(ctx context.Context, request *rentalpb.CreateProfilePhotoRequest) (*rentalpb.CreateProfilePhotoResponse, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}
	br, err := s.BlobClient.CreateBlob(ctx, &blobpb.CreateBlobRequest{
		AccountId:           aid.String(),
		UploadUrlTimeoutSec: int32(s.PhotoUploadExpire.Seconds()),
	})
	if err != nil {
		s.Logger.Error("cannot create blob", zap.Error(err))
		return nil, status.Error(codes.Aborted, "")
	}

	err = s.Mongo.UpdateProfilePhoto(ctx, aid, id.BlobID(br.Id))
	if err != nil {
		s.Logger.Error("cannot update profile photo", zap.Error(err))
		return nil, status.Error(codes.Aborted, "")
	}

	return &rentalpb.CreateProfilePhotoResponse{
		UploadUrl: br.UploadUrl,
	}, nil
}

// CompleteProfilePhoto completes profile photo, returns AI recognition results.
func (s *Service) CompleteProfilePhoto(ctx context.Context, request *rentalpb.CompleteProfilePhotoRequest) (*rentalpb.Identity, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}
	pr, err := s.Mongo.GetProfile(ctx, aid)
	if err != nil {
		return nil, status.Error(s.logAndConvertProfileErr(err), "")
	}

	if pr.PhotoBlobID == "" {
		return nil, status.Error(codes.NotFound, "")
	}

	br, err := s.BlobClient.GetBlob(ctx, &blobpb.GetBlobRequest{
		Id: pr.PhotoBlobID,
	})
	if err != nil {
		s.Logger.Error("cannot get blob", zap.Error(err))
		return nil, status.Error(codes.Aborted, "")
	}

	s.Logger.Info("got profile photo", zap.Int("size", len(br.Data)))
	//return s.IdentityResolver.Resolve(ctx, br.Data)
	return &rentalpb.Identity{
		LicNumber:       "322152452",
		Name:            "张三",
		Gender:          rentalpb.Gender_FEMALE,
		BirthDateMillis: 631152000000,
	},nil
}

// ClearProfilePhoto clears profile photo.
func (s *Service) ClearProfilePhoto(ctx context.Context, request *rentalpb.ClearProfilePhotoRequest) (*rentalpb.ClearProfilePhotoResponse, error) {
	aid, err := auth.AccountIDFromContext(ctx)
	if err != nil {
		return nil, err
	}
	err = s.Mongo.UpdateProfilePhoto(ctx, aid, id.BlobID(""))
	if err != nil {
		s.Logger.Error("cannot clear profile photo", zap.Error(err))
		return nil, status.Error(codes.Internal, "")
	}
	return &rentalpb.ClearProfilePhotoResponse{}, nil
}

func (s *Service) logAndConvertProfileErr(err error) codes.Code {
	if err == mongo.ErrNoDocuments {
		return codes.NotFound
	}
	s.Logger.Error("cannot get profile", zap.Error(err))
	return codes.Internal
}

```

#### 身份认证信息的更新

```go
// Verify verifies account identity
func (m *Manager) Verify( ctx context.Context, aid id.AccountID) (id.IdentityID, error) {
	nilID:=id.IdentityID("")
	p,err:=m.Fetcher.GetProfile(ctx,&rentalpb.GetProfileRequest{})
	if err!=nil{
		return nilID,fmt.Errorf("cannot get profile :%v",err)
	}

	if p.IdentityStatus!=rentalpb.IdentityStatus_VERIFIED{
		return nilID,fmt.Errorf("invalid identity status")
	}

	b,err:=proto.Marshal(p.Identity)
	if err!=nil{
		return nilID,fmt.Errorf("cannot marshal identity :%v",err)
	}
	return id.IdentityID(base64.StdEncoding.EncodeToString(b)),nil

}
```

## 2.3 身份信息的存储服务

### 对象存储

​		海量文件的分布式存储服务，安全可靠，简单易用

### 对象存储简单练习

1.开启腾讯云账户

2.创建存储桶

3.用go语言操作对象存储

```go
package main

import (
	"context"
	"fmt"
    "net/url"
)

func main(){
	u, err := url.Parse("https://coolcar-1307768051.cos.ap-guangzhou.myqcloud.com")
	if err!=nil{
		panic(err)
	}
	
	b := &cos.BaseURL{BucketURL: u}
	secID:="AKIDYw4vWqtfAPq1wue8LJ0PXOzJM8eutb4G"
	secKey:="xd2B3ey0lFSQ7YibFciX5NO8cplQoxua"
	// 1.永久密钥
	client := cos.NewClient(b, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  "SECRETID",  // 替换为用户的 SecretId，请登录访问管理控制台进行查看和管理，https://console.cloud.tencent.com/cam/capi
			SecretKey: "SECRETKEY", // 替换为用户的 SecretKey，请登录访问管理控制台进行查看和管理，https://console.cloud.tencent.com/cam/capi
		},
	})
	
	name:="abc.png"
	// 获取预签名URL
	presignedURL, err := client.Object.GetPresignedURL(context.Background() , http.MethodPut, name, secID, secKey, time.Hour, nil)
	if err != nil {
		panic(err)
	/}
	fmt.Println(presignedURL)
	
}
```

### 图片上传/下载

​		blob服务用作照片管理，`ProfileService`根据`accountID`请求用户的上传地址，`BlobService`根据`accountID`创建一个path用来存放该用户的文件（blob服务本身并不知道文件是图片还是其他），并以此path询问腾讯云对象存储的预签名URL，并将`blobID`(`blobID`将`accountID`和`path`对应起来)和预签名返回给`ProfileService`，`ProfileService`将`blobID`存储起来，并将URL返回给小程序。

​		小程序用拿到的URL直接上传到腾讯云的对象存储，并通知`ProfileService`上传完成，`ProfileService`通过`BlobID`向`BlobService`索取图片，`BlobService`从腾讯云获取图片数据，并逐级返回，最后第三方库进行图片识别。

![image-20220211175729419](E:\typroa_pic\image-20220211175729419.png)

![image-20220211181635731](E:\typroa_pic\image-20220211181635731.png)



### 图片展示

![image-20220211181914345](E:\typroa_pic\image-20220211181914345.png) 

### 数据库部分

```go
// Mongo defines a mongo dao
type Mongo struct {
	col *mongo.Collection
}

// NewMongo creates a new mongo dao
func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		col: db.Collection("blob"),
	}
}

// BlobRecord  defines a blob record
type BlobRecord struct {
	mgutil.IDField	 `bson:"inline"`
	AccountID string `bson:"account_id" `
	Path      string `bson:"path"`
}

// CreateBlob  creates a blob record
func (m *Mongo)CreateBlob(c context.Context,aid id.AccountID)(*BlobRecord ,error){
	br:=&BlobRecord{
		AccountID: aid.String(),
	}
	objID:=mgutil.NewObjID()
	br.ID =objID
	br.Path=fmt.Sprintf("%s/%s",aid.String(),objID.Hex())

	_,err:=m.col.InsertOne(c,br)
	if err!=nil{
		return nil,err
	}
	return br,nil
}

// GetBlob gets a blob record.
func (m *Mongo) GetBlob(c context.Context, bid id.BlobID) (*BlobRecord, error) {
	objID, err := objid.FromID(bid)
	if err != nil {
		return nil, fmt.Errorf("invalid object id: %v", err)
	}

	res := m.col.FindOne(c, bson.M{
		mgutil.IDFieldName: objID,
	})

	if err := res.Err(); err != nil {
		return nil, err
	}

	var br BlobRecord
	err = res.Decode(&br)
	if err != nil {
		return nil, fmt.Errorf("cannot decode result: %v", err)
	}

	return &br, nil
}

```

### 服务器部分

```go
// Storage defines storage interface
type Storage interface {
	SignURL(ctx context.Context,method,path string,timeout time.Duration)(string,error)
	Get(ctx context.Context,path string)(io.ReadCloser,error)
}

type Service struct{
	Storage	Storage
	Mongo *dao.Mongo
	Logger *zap.Logger
	*blobpb.UnimplementedBlobServiceServer
}

func (s *Service) CreateBlob(ctx context.Context, request *blobpb.CreateBlobRequest) (*blobpb.CreateBlobResponse, error) {
	aid:=id.AccountID(request.AccountId)
	br,err:=s.Mongo.CreateBlob(ctx,aid)
	if err!=nil{
		s.Logger.Error("cannot create blob",zap.Error(err))
		return nil,status.Error(codes.Internal,"")
	}

u,err:=s.Storage.SignURL(ctx,http.MethodPut,br.Path,secToDuration(request.UploadUrlTimeoutSec))
	if err!=nil{
		return nil,status.Errorf(codes.Aborted,"cannot sign url: %v",err)
	}

	return &blobpb.CreateBlobResponse{
		Id:        br.ID.Hex(),
		UploadUrl: u,
	},nil
}

func (s *Service) GetBlob(ctx context.Context, request *blobpb.GetBlobRequest) (*blobpb.GetBlobResponse, error) {
	br,err:=s.getBlobRecord(ctx,id.BlobID(request.Id))
	if err!=nil{
		return nil,err
	}
	r,err:=s.Storage.Get(ctx,br.Path)
	if r!=nil{
		defer r.Close()
	}
	if err!=nil{
		return nil,status.Errorf(codes.Aborted,"cannot got storage: %v",err)
	}
	b,err:=ioutil.ReadAll(r)
	if err!=nil{
		return nil,status.Errorf(codes.Aborted,"cannot read from response: %v",err)
	}

	return &blobpb.GetBlobResponse{Data: b},nil
}

func (s *Service) GetBlobURL(ctx context.Context, request *blobpb.GetBlobURLRequest) (*blobpb.GetBlobURLResponse, error) {
	br,err:=s.getBlobRecord(ctx,id.BlobID(request.Id))
	if err!=nil{
		return nil,err
	}
	u,err:=s.Storage.SignURL(ctx,http.MethodGet,br.Path,secToDuration(request.TimeoutSec))
	if err!=nil{
		return nil,status.Errorf(codes.Aborted,"cannot sign url: %v",err)
	}

	return &blobpb.GetBlobURLResponse{Url: u},nil
}

func (s *Service)getBlobRecord(ctx context.Context ,bid id.BlobID)(*dao.BlobRecord,error){
	br,err:=s.Mongo.GetBlob(ctx,bid)
	if err==mongo.ErrNoDocuments{
		return nil,status.Error(codes.NotFound,"")
	}
	if err!=nil{
		return nil,status.Error(codes.InvalidArgument,err.Error())
	}
	return br,nil
}

func secToDuration(sec int32)time.Duration{
	return time.Duration(sec)*time.Second
}
```



# 3.车辆服务

![image-20220218160457297](E:\typroa_pic\image-20220218160457297.png)

# 4.`k8s`集群部署

## 4.1 `kubectl`的安装和使用

下载可执行文件并加载到环境变量中,注意`kubectl`和`kubernetes`版本相差尽量不要太多

```bash
curl -LO https://dl.k8s.io/release/v1.18.0/bin/linux/amd64/kubectl
```

`kubectl linux`安装 https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

## 4.2 `kubectl`连接集群

**通过`Kubectl`连接`Kubernetes`集群操作说明:**

1. 下载最新的` kubectl `客户端。

2. 配置 `Kubeconfig`：

- 若当前访问客户端尚未配置任何集群的访问凭证，即 `~/.kube/config` 内容为空，可直接复制腾讯云的` kubeconfig` 访问凭证内容并粘贴入` ~/.kube/config `中。

- 若当前访问客户端已配置了其他集群的访问凭证，你可下载上方` kubeconfig` 至指定位置，并执行以下指令以追加本集群的 `kubeconfig` 至环境变量。

  ```
  export KUBECONFIG=$KUBECONFIG:$HOME/Downloads/cls-iz80vwqn-config
  ```

  其中，`$HOME/Downloads/cls-iz80vwqn-config` 为本集群的 `kubeconfig `的文件路径，请替换为下载至本地后的实际路径。有关多集群 `Kubeconfig` 配置及管理请参考：[配置对多集群的访问](https://kubernetes.io/zh/docs/tasks/access-application-cluster/configure-access-multiple-clusters/)

3. 访问 `Kubernetes` 集群：

- 完成` kubeconfig `配置后，执行以下指令查看并切换 context 以访问本集群：

  ```
  kubectl config --kubeconfig=$HOME/Downloads/cls-iz80vwqn-config get-contexts
  kubectl config --kubeconfig=$HOME/Downloads/cls-iz80vwqn-config use-context cls-iz80vwqn-100021648098-context-default
  ```

  而后可执行 `kubectl get node` 测试是否可正常访问集群。如果无法连接请查看是否已经开启公网访问或内网访问入口，并确保访问客户端在指定的网络环境内。

## 4.3为服务制作镜像

编写`dockerfile`文件，利用多阶段编译对镜像瘦身

```dockerfile
# 启动编译环境
FROM golang:1.17 AS builder

# 配置编译环境
RUN go env -w GO111MODULE=on
RUN go env -w GOPROXY=https://goproxy.cn,direct

# 拷贝源代码到镜像中
COPY . /go/src/coolcar/server

# 编译
WORKDIR /go/src/coolcar/server
RUN CGO_ENABLED=0 GOOS=linux go install ./auth/...

# 安装grpc-health-probe
RUN go get github.com/grpc-ecosystem/grpc-health-probe

FROM alpine
COPY --from=builder /go/bin/auth /bin/auth
COPY --from=builder /go/bin/grpc-health-probe /bin/grpc-health-probe
ENV ADDR=:8081

# 申明暴露的端口
EXPOSE 8081

# 设置服务入口
ENTRYPOINT [ "/bin/auth" ]
```

编译命令

```bash
docker build -t image_name -f dockerfile_path
```

