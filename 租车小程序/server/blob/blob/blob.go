package blob

import (
	"context"
	"coolcar/blob/api/gen/v1"
	"coolcar/blob/dao"
	"coolcar/shared/id"
	"go.mongodb.org/mongo-driver/mongo"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"io"
	"io/ioutil"
	"net/http"
	"time"
)

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