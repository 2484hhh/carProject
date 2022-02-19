package dao

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/id"
	mgtuil "coolcar/shared/mongo"
	"coolcar/shared/mongo/objid"
	mongotesting "coolcar/shared/mongo/testing"
	"github.com/google/go-cmp/cmp"
	"google.golang.org/protobuf/testing/protocmp"
	"os"
	"testing"
)

//implant
func TestMongo_CreateTrip(t *testing.T) {
	c:=context.Background()
	mc, err :=mongotesting.NewClient(c)
	if err!=nil{
		t.Fatalf("cannot connect mongodb :%v",err)
	}
	db:=mc.Database("coolcar")
	err =mongotesting.SetupIndexes(c,db)
	if err!=nil{
		t.Fatalf("cannot set up indexes: %v",err)
	}
}

func TestMongo_GetTrip(t *testing.T) {
	//start container
	c:=context.Background()
	mc, err :=mongotesting.NewClient(c)
	if err!=nil{
		t.Fatalf("cannot connect mongodb :%v",err)
	}

	acct:=id.AccountID("account1")
	m:= NewMongo(mc.Database("coolcar"))
	tr,err:=m.CreateTrip(c,&rentalpb.Trip{
		AccountId: acct.String(),
		CarId: "car1",
		Start: &rentalpb.LocationStatus{
			PoiName:  "startpoint",
			Location: &rentalpb.Location{
				Latitude: 30,
				Longitude: 120,
			},
		},
		End: &rentalpb.LocationStatus{
			Location: &rentalpb.Location{
				Latitude:  35,
				Longitude: 115,
			},
			FeeCent:  1000,
			KmDriven: 35,
			PoiName:  "endpoint",
		},
		Status: rentalpb.TripStatus_IN_PROGRESS,
	})
	if err!=nil{
		t.Fatalf("cannot create trip :%v",err)
	}

	got,err:=m.GetTrip(c,objid.ToTripID(tr.ID),acct)
	if err!=nil{
		t.Errorf("cannot get trip: %v",err)
	}

	if diff:=cmp.Diff(tr,got,protocmp.Transform());diff!=""{
		t.Errorf("result differs; -want +got: %s",diff)
	}

}

func TestMongo_UpdateTrip(t *testing.T) {
	c:=context.Background()
	mc, err :=mongotesting.NewClient(c)
	if err!=nil{
		t.Fatalf("cannot connect mongodb :%v",err)
	}

	m:=NewMongo(mc.Database("coolcar"))
	tid:=id.TripID("61c9652b3a220f97431205f7")
	aid:=id.AccountID("account_for_update")

	var now int64=10000
	mgtuil.NewObjIDWithValue(tid)
	mgtuil.UpdatedAt=func()int64{
		return now
	}

	tr,err:=m.CreateTrip(c,&rentalpb.Trip{
		AccountId: aid.String(),
		Status:    rentalpb.TripStatus_IN_PROGRESS,
		Start: &rentalpb.LocationStatus{
			PoiName:  "start_poi",
		},
	})
	if err!=nil{
		t.Fatalf("cannot create trip: %v",err)
	}
	if tr.UpdatedAt!=10000{
		t.Fatalf("wrong updatedat; want: 10000, got :%d",tr.UpdatedAt)
	}

	update:=&rentalpb.Trip{
		AccountId: aid.String(),
		Status:    rentalpb.TripStatus_IN_PROGRESS,
		Start: &rentalpb.LocationStatus{
			PoiName:  "start_poi_updated",
		},
	}
	cases:=[]struct{
		name string
		now	 int64
		withUpdatedAt  int64
		wantErr bool
	}{
		{
			name:"normal_update",
			now:20000,
			withUpdatedAt: 10000,
		},
		{
			name:"update_with_stale_timestamp",
			now:30000,
			withUpdatedAt: 10000,
			wantErr: true,
		},
		{
			name:"update_with_refetch",
			now:40000,
			withUpdatedAt: 20000,
		},
	}

	for _,cc :=range cases{
		now=cc.now
		err =m.UpdateTrip(c,tid,aid,cc.withUpdatedAt,update)
		if cc.wantErr {
			if err == nil {
				t.Errorf("%s:want error,got none", cc.name)
			}else {
				continue
			}
		} else {
			if err!=nil{
				t.Errorf("%s: cannot update: %v",cc.name,err)
			}
		}
		updateTrip,err:=m.GetTrip(c,tid,aid)
		if err!=nil{
			t.Errorf("%s,cannot get trip after update:%v",cc.name,err)
		}
		if now!=updateTrip.UpdatedAt{
			t.Errorf("%s: incorrect updatedat: want %d,got %d",cc.name,cc.now,updateTrip.UpdatedAt)
		}

	}

}

func TestMain(m *testing.M){

	os.Exit(mongotesting.RunWithMongoInDocker(m))
}

