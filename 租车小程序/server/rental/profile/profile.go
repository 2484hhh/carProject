package profile

import (
	"context"
	blobpb "coolcar/blob/api/gen/v1"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/rental/profile/dao"
	"coolcar/shared/id"
	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"time"

	"coolcar/shared/auth"
	"go.uber.org/zap"
)

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
