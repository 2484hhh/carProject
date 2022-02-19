package mgutil

import (
	"coolcar/shared/mongo/objid"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)
const (
	IDFieldName = "_id"
	UpdatedAtFieldName ="updatedat"
)

type IDField struct {
	ID primitive.ObjectID `bson:"_id"`
}

// UpdatedAtField  defies the updatedat field
type UpdatedAtField struct {
	UpdatedAt int64 `bson:"updatedat"`
}

// NewObjID generates a new object id
var NewObjID = primitive.NewObjectID

var UpdatedAt = func()int64{
	return time.Now().UnixNano()
}

//Set returns a $set update document
func Set(v interface{})bson.M{
	return bson.M{
		"$set":v,
	}
}

func SetOnInsert(v interface{})bson.M{
	return bson.M{
		"$setOnInsert":v,
	}
}

// NewObjIDWithValue sets id for next objectID generation
func NewObjIDWithValue(id fmt.Stringer){
	NewObjID=func()primitive.ObjectID{
		return objid.MustFromID(id)
	}
}

// ZeroOrDoesNotExist  generates a filter expression with field equal to zero or filter does not exist
func ZeroOrDoesNotExist(field string, zero interface{})bson.M{
	return bson.M{
		"$or":[]bson.M{
			{
				field:zero,
			},
			{
				field: bson.M{
					"$exists":false,
				},
			},
		},
	}
}