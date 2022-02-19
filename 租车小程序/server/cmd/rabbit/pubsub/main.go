package main

import (
	"fmt"
	"github.com/streadway/amqp"
	"time"
)

const exchange ="go_ex"

func main()  {
	conn,err:=amqp.Dial("amqp://guest:guest@192.168.178.128:5672/")
	if err!=nil{
		panic(err)
	}
	ch,err:=conn.Channel()
	if err!=nil{
		panic(err)
	}

	err =ch.ExchangeDeclare(exchange,"fanout",true,false,false,false,nil)
	if err!=nil{
		panic(err)
	}

	go subscribe(conn,exchange)
	go subscribe(conn,exchange)

	i:=0
	for{
		i++
		err:=ch.Publish(exchange,"",false,false,amqp.Publishing{
			Body: []byte (fmt.Sprintf("message %d",i)),
		})
		if err!=nil{
			fmt.Println(err.Error())
		}
		time.Sleep(200 *time.Millisecond)
	}
}

func subscribe(conn *amqp.Connection,ex string){
	ch,err:=conn.Channel()
	defer ch.Close()
	if err!=nil{
		panic(err)
	}

	q,err:=ch.QueueDeclare("",false,true,false,false,nil)
	if err!=nil{
		panic(err)
	}
	defer ch.QueueDelete(q.Name,false,false,false)

	err=ch.QueueBind(q.Name,"",ex,false,nil)
	if err!=nil{
		panic(err)
	}
	consume("c",ch,q.Name)

}


func consume(cname string,ch *amqp.Channel,q string){
	msgs,err := ch.Consume(q,cname,true,false,false,false,nil)
	if err!=nil{
		panic(err)
	}

	for msg:=range msgs{
		fmt.Printf("%s: %s\n",cname,msg.Body)
	}
}