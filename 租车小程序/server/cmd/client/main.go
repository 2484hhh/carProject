package main

import (
	"context"
	trippb "coolcar/proto/gen/go"
	"fmt"
	"google.golang.org/grpc"
	"log"
)

func main() {
	conn, err := grpc.Dial("192.168.178.128:8081", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("grpc connect err :%v", err)
	}
	client := trippb.NewTripServiceClient(conn)
	res, err := client.GetTrip(context.Background(), &trippb.GetTripRequest{
		Id: "trip456",
	})
	fmt.Println(res)
}
