package main

import (
	"fmt"
	"github.com/streadway/amqp"
	"time"
)

func main()  {
	conn,err:=amqp.Dial("amqp://guest:guest@192.168.178.128:5672/")
	if err!=nil{
		panic(err)
	}
	ch,err:=conn.Channel()
	if err!=nil{
		panic(err)
	}
	q,err:=ch.QueueDeclare("go_q1",true,false,false,false,nil)
	if err!=nil{
		panic(err)
	}

	go consume("c1",conn,q.Name)
	go consume("c2",conn,q.Name)

	i:=0
	for{
		i++
		err:=ch.Publish("",q.Name,false,false,amqp.Publishing{
			Body: []byte (fmt.Sprintf("message %d",i)),
		})
		if err!=nil{
			fmt.Println(err.Error())
		}
		time.Sleep(200 *time.Millisecond)
	}
}

func consume(cname string,conn *amqp.Connection,q string){
	ch,err:=conn.Channel()
	defer ch.Close()
	if err!=nil{
		panic(err)
	}
	msgs,err := ch.Consume(q,cname,true,false,false,false,nil)
	if err!=nil{
		panic(err)
	}

	for msg:=range msgs{
		fmt.Printf("%s: %s\n",cname,msg.Body)
	}
}