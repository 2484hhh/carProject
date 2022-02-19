package dao

import (
	"context"
	"coolcar/shared/id"
	mgutil "coolcar/shared/mongo"
	"coolcar/shared/mongo/objid"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const openIDField = "open_id"

// Mongo defines a mongo dao
type Mongo struct {
	col      *mongo.Collection
}

// NewMongo creates a new mongo dao
func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		col:      db.Collection("account"),
	}
}

// ResolveAccountId resolves the account id from open id
func (m *Mongo) ResolveAccountId(c context.Context, openId string) (id.AccountID, error) {

	insertedId :=mgutil.NewObjID()
	res := m.col.FindOneAndUpdate(c, bson.M{
		openIDField: openId,
	}, mgutil.SetOnInsert(bson.M{
		mgutil.IDFieldName: insertedId,
		openIDField:        openId,
	}), options.FindOneAndUpdate().SetUpsert(true).SetReturnDocument(options.After))

	if err := res.Err(); err != nil {
		return "", fmt.Errorf("cannot FindOneAndUpdate: %v\n", err)
	}
	var row mgutil.IDField
	err := res.Decode(&row)
	if err != nil {
		return "", fmt.Errorf("Decode error: %v\n", err)
	}
	return objid.ToAccountID(row.ID), nil
}

/*function resolveOpenID(open_id){
return db.account.findAndModify({
  query:{
    open_id: open_id
    },
  update:{
    $set: {open_id: open_id}
    },
  upsert: true,
  new:true,
})
}*/
