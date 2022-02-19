package mongotesting

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"testing"
	"time"
)
const (
	image="mongo"
	containerPort="27017/tcp"
)

var mongoURI string

const defaultMongoURI = "mongodb://192.168.178.128:27017"

// RunWithMongoInDocker run the tests
func RunWithMongoInDocker(m *testing.M)int {
	tr := &http.Transport{
		//建立连接后读超时
		ResponseHeaderTimeout: time.Second * 2,
	}
	cli:=http.Client{
		Transport:     tr,
		CheckRedirect: nil,
		Jar:           nil,
		Timeout:       0,
	}
	c,err:=client.NewClient("tcp://192.168.178.128:2375","",&cli,nil)
	if err!=nil{
		panic(err)
	}
	ctx:=context.Background()

	resp,err:=c.ContainerCreate(ctx,&container.Config{
		Image: image,
		ExposedPorts: nat.PortSet{
			containerPort:{},
		},
	},&container.HostConfig{
		PortBindings: nat.PortMap{
			containerPort:[]nat.PortBinding{
				{
					HostIP: "0.0.0.0",
					HostPort: "0",
				},
			},
		},
	},nil,"")
	if err!=nil{
		fmt.Printf("%s",err)
	}
	containerId:=resp.ID
	defer func() {
		err=c.ContainerRemove(ctx,containerId,types.ContainerRemoveOptions{Force: true})
		if err!=nil{
			panic(err)
		}
	}()

	err=c.ContainerStart(ctx,containerId,types.ContainerStartOptions{})
	if err!=nil{
		panic(err)
	}

	inspect, err := c.ContainerInspect(ctx, containerId)
	if err != nil {
		panic(err)
	}
	hostPort := inspect.NetworkSettings.Ports[containerPort][0]
	mongoURI=fmt.Sprintf("mongodb://192.168.178.128:%s",hostPort.HostPort)


	return m.Run()
}

// NewClient creates a client connected to the mongo instar
func NewClient(c context.Context)(*mongo.Client,error){
	if mongoURI==""{
		return nil,fmt.Errorf("mongoURI not set, please run again ")
	}
	return mongo.Connect(c, options.Client().ApplyURI(mongoURI))

}

// NewDefaultClient  creates a client connected to mongodb
func NewDefaultClient(c context.Context)(*mongo.Client,error){
	return mongo.Connect(c,options.Client().ApplyURI(defaultMongoURI ))
}

func SetupIndexes(c context.Context,d *mongo.Database)error{
	_,err:=d.Collection("account").Indexes().CreateOne(c,mongo.IndexModel{
		Keys:    bson.D{
			{Key: "open_id",Value: 1},
		},
		Options: options.Index().SetUnique(true),
	})
	if err!=nil{
		return err
	}
	_,err = d.Collection("trip").Indexes().CreateOne(c,mongo.IndexModel{
		Keys:   bson.D{
			{Key: "trip.accountid",Value: 1},
			{Key: "trip.status",Value: 1},
			},
		Options: options.Index().SetUnique(true).SetPartialFilterExpression(bson.M{
			"trip.status":1,
		}),
	})
	if err!=nil{
		return err
	}
	_,err = d.Collection("profile").Indexes().CreateOne(c,mongo.IndexModel{
		Keys: bson.D{
			{Key: "accountid", Value: 1},
		},
		Options: options.Index().SetUnique(true),
	})
	return err
}