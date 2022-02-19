package main

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"net/http"
	"time"
)

func main() {


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
		Image: "mongo",
		ExposedPorts: nat.PortSet{
			"27017/tcp":{},
		},
	},&container.HostConfig{
		PortBindings: nat.PortMap{
		"27017/tcp":[]nat.PortBinding{
				{
					HostIP: "0.0.0.0",
					HostPort: "0",
				},
			},
		},
	},nil,"")
	if err!=nil{
		panic(err)
	}

	err=c.ContainerStart(ctx,resp.ID,types.ContainerStartOptions{})
	if err!=nil{
		panic(err)
	}

	fmt.Println("container started")
	time.Sleep(5*time.Second)

	inspect, err := c.ContainerInspect(ctx, resp.ID)
	if err != nil {
		panic(err)
	}
	fmt.Printf("listening as %+v\n",inspect.NetworkSettings.Ports["27017/tcp"][0])
	fmt.Println("container end")
	err=c.ContainerRemove(ctx,resp.ID,types.ContainerRemoveOptions{Force: true})
	if err!=nil{
		panic(err)
	}
}