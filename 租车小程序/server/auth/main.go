package main

import (
	"context"
	authpb "coolcar/auth/api/gen/v1"
	"coolcar/auth/auth"
	"coolcar/auth/dao"
	"coolcar/auth/token"
	"coolcar/auth/wechat"
	"coolcar/shared/server"
	"github.com/dgrijalva/jwt-go"
	"github.com/namsral/flag"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"log"
	"time"
)

var addr = flag.String("addr", ":8081", "address to listen")
var mongoURI = flag.String("mongo_uri", "mongodb://192.168.178.128:27017", "mongo uri")

//var privateKeyFile = flag.String("private_key_file", "/auth/private.key", "private key file")
var wechatAppID = flag.String("wechat_app_id", "wechatAppID", "wechat app id")
var wechatAppSecret = flag.String("wechat_app_secret", "wechatAppSecret", "wechat app secret")

const pkFile = ""
func main() {
	flag.Parse()
	logger, err := zap.NewDevelopment()
	if err != nil {
		log.Fatalf("cannot create logger：%v", err)
	}
	c := context.Background()
	mongoClient, err := mongo.Connect(c, options.Client().ApplyURI(*mongoURI))
	if err != nil {
		logger.Fatal("cannot connect mongodb：%v", zap.Error(err))
	}

	////read the privateKey
	//pkFile, err := os.Open(privateKeyFile)
	//if err != nil {
	//	logger.Fatal("cannot open private key", zap.Error(err))
	//}
	pkBytes := []byte(pkFile)
	if err != nil {
		logger.Fatal("cannot read private key", zap.Error(err))
	}
	privateKey, err := jwt.ParseRSAPrivateKeyFromPEM(pkBytes)
	if err != nil {
		logger.Fatal("cannot parse private key", zap.Error(err))
	}

	logger.Sugar().Fatal(server.RunGRPCServer(&server.GRPCConfig{
		Name:   "auth",
		Addr:   *addr,
		Logger: logger,
		RegisterFunc: func(s *grpc.Server) {
			authpb.RegisterAuthServiceServer(s, &auth.Service{
				OpenIDResolver: &wechat.Service{
					AppID:     *wechatAppID,
					AppSecret: *wechatAppSecret,
				},
				Logger:         logger,
				Mongo:          dao.NewMongo(mongoClient.Database("coolcar")),
				TokenExpire:    2 * time.Hour,
				TokenGenerator: token.NewJWTTokenGen("coolcar/auth", privateKey),
			})
		},
	}))
}
