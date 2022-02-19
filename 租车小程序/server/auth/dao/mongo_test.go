package dao

import (
	"context"
	"coolcar/shared/id"
	mgtuil "coolcar/shared/mongo"
	"coolcar/shared/mongo/objid"
	mongotesting "coolcar/shared/mongo/testing"
	"go.mongodb.org/mongo-driver/bson"
	"os"
	"testing"
)

func TestMongo_ResolveAccountId(t *testing.T) {
	//start container
	c:=context.Background()
	mc, err :=mongotesting.NewClient(c)
	if err!=nil{
		t.Fatalf("cannot connect mongodb :%v",err)
	}
	m:= NewMongo(mc.Database("coolcar"))

	_, err = m.col.InsertMany(c, []interface{}{
		bson.M{
			mgtuil.IDFieldName: objid.MustFromID(id.AccountID("61c540971fbc49a49c6cc6ae")),
			openIDField:        "openid_1",
		},
		bson.M{
			mgtuil.IDFieldName: objid.MustFromID(id.AccountID("61c540971fbc49a49c6cc6af")),
			openIDField:        "openid_2",
		},
	})
	if err != nil {
		t.Fatalf("caanot insert initial values: %v",err)
	}


	mgtuil.NewObjIDWithValue(id.AccountID("61c1961464b1dcb731fe7617"))

	cases:=[]struct{
		name 	string
		openID 	string
		want 	string
	}{
		{
			name: "existing_user",
			openID: "openid_1",
			want: "61c540971fbc49a49c6cc6ae",
		},
		{
			name: "another_existing_user",
			openID: "openid_2",
			want: "61c540971fbc49a49c6cc6af",
		},
		{
			name: "new_user",
			openID: "openid_3",
			want: "61c1961464b1dcb731fe7617",
		},
	}

	for _,cc:=range cases{
		t.Run(cc.name,func(t *testing.T){

			id,err:=m.ResolveAccountId(context.Background(),cc.openID)
			if err!=nil{
				t.Errorf("ResolveAccountId  error :%q ,%v",cc.openID,err)
			}
			if id.String()!=cc.want{
				t.Errorf("ResolveAccountId  want :%v,  but get:%v",cc.want,id)
			}
		})
	}
}




var mongoURI string

func TestMain(m *testing.M){

	os.Exit(mongotesting.RunWithMongoInDocker(m))
}