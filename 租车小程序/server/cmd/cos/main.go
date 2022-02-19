package main

import (
	"context"
	blobpb "coolcar/blob/api/gen/v1"
	"fmt"
	"google.golang.org/grpc"
)

func main(){
	//u, err := url.Parse("https://coolcar-1307768051.cos.ap-guangzhou.myqcloud.com")
	//if err!=nil{
	//	panic(err)
	//}
	//
	//
	//b := &cos.BaseURL{BucketURL: u}
	//secID:="AKIDYw4vWqtfAPq1wue8LJ0PXOzJM8eutb4G"
	//secKey:="xd2B3ey0lFSQ7YibFciX5NO8cplQoxua"
	//// 1.永久密钥
	//client := cos.NewClient(b, &http.Client{
	//	Transport: &cos.AuthorizationTransport{
	//		SecretID:  "SECRETID",  // 替换为用户的 SecretId，请登录访问管理控制台进行查看和管理，https://console.cloud.tencent.com/cam/capi
	//		SecretKey: "SECRETKEY", // 替换为用户的 SecretKey，请登录访问管理控制台进行查看和管理，https://console.cloud.tencent.com/cam/capi
	//	},
	//})
	//
	//name:="abc.png"
	//// 获取预签名URL
	//presignedURL, err := client.Object.GetPresignedURL(context.Background() , http.MethodPut, name, secID, secKey, time.Hour, nil)
	//if err != nil {
	//	panic(err)
	//}
	//fmt.Println(presignedURL)
	conn,err:=grpc.Dial("localhost:8083",grpc.WithInsecure())
	if err!=nil{
		panic(err)
	}
	c:=blobpb.NewBlobServiceClient(conn)
	ctx:=context.Background()
	//res,err:=c.CreateBlob(ctx,&blobpb.CreateBlobRequest{
	//	AccountId:           "account_1",
	//	UploadUrlTimeoutSec: 1000,
	//})
	res,err:=c.GetBlob(ctx,&blobpb.GetBlobRequest{Id:"61cc5c2c60572a4856e3a594" })
	if err!=nil{
		panic(err)
	}
	fmt.Printf("%+v\n",res)
}
