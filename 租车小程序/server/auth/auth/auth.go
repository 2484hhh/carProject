package auth

import (
	"context"
	authpb "coolcar/auth/api/gen/v1"
	"coolcar/auth/dao"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"time"
)


type Service struct {
	OpenIDResolver 	OpenIDResolver
	Mongo 			*dao.Mongo
	Logger 			*zap.Logger
	TokenGenerator  TokenGenerator
	TokenExpire		time.Duration
	*authpb.UnimplementedAuthServiceServer
}

type OpenIDResolver interface {
	Resolve(code string) (string,error)
}

// TokenGenerator generates a token for the specified account
type TokenGenerator interface {
	GenerateToken(accountID string,expire time.Duration)(string,error)
}


// Login logs a user in
func (s *Service)Login(c context.Context,request *authpb.LoginRequest) (*authpb.LoginResponse,error) {
	openId,err:=s.OpenIDResolver.Resolve(request.Code)
	if err!=nil{
		return nil,status.Errorf(codes.Unavailable,"cannot resolve openid: $v",err)
	}

	accountID,err:=s.Mongo.ResolveAccountId(c,openId)
	if err!=nil{
		s.Logger.Error("cannot resolve account id",zap.Error(err))
		return nil,status.Errorf(codes.Internal,"")
	}

	tkn,err:=s.TokenGenerator.GenerateToken(accountID.String(),s.TokenExpire)
	if err!=nil{
		s.Logger.Error("cannot generate token",zap.Error(err))
		return nil,status.Error(codes.Internal,"")
	}
	return &authpb.LoginResponse{
		AccessToken: tkn,
		ExpiresIn_: int32(s.TokenExpire.Seconds()),
	} ,nil
}
