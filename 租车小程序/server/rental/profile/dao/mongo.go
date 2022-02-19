package dao

import (
	"context"
	rentalpb "coolcar/rental/api/gen/v1"
	"coolcar/shared/id"
	mgutil "coolcar/shared/mongo"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	accountIDField      = "accountid"
	profileIDField      = "profile"
	identityStatusField = profileIDField + ".identitystatus"
	photoblobidField	= "photoblobid"
)

// Mongo defines a mongo dao
type Mongo struct {
	col *mongo.Collection
}

// NewMongo creates a new mongo dao
func NewMongo(db *mongo.Database) *Mongo {
	return &Mongo{
		col: db.Collection("profile"),
	}
}

// ProfileRecord  defines the profile record in db
type ProfileRecord struct {
	AccountID   string            `bson:"accountid"`
	Profile     *rentalpb.Profile `bson:"profile"`
	PhotoBlobID string            `bson:"photoblobid"`
}

// GetProfile get profile
func (m *Mongo) GetProfile(c context.Context, aid id.AccountID) (*ProfileRecord, error) {
	res := m.col.FindOne(c, byAccountID(aid))
	if err := res.Err(); err != nil {
		return nil, err
	}
	var pr ProfileRecord
	err := res.Decode(&pr)
	if err != nil {
		return nil, fmt.Errorf("cannot decode profile record : %v", err)
	}
	return &pr, nil
}

func (m *Mongo) UpdateProfile(c context.Context, aid id.AccountID, p *rentalpb.Profile, prevStatus rentalpb.IdentityStatus) error {
	filter:=bson.M{
		identityStatusField: prevStatus,
	}
	if prevStatus==rentalpb.IdentityStatus_UNSUBMITTED{
		filter =mgutil.ZeroOrDoesNotExist(identityStatusField,prevStatus)
	}
	filter[accountIDField]=aid.String()

	_, err := m.col.UpdateOne(c, filter, mgutil.Set(bson.M{
		accountIDField: aid.String(),
		profileIDField: p,
	}), options.Update().SetUpsert(true))
	return err
}

func (m *Mongo)UpdateProfilePhoto(c context.Context,aid id.AccountID,bid id.BlobID)error{
	_, err := m.col.UpdateOne(c, bson.M{
		accountIDField:      aid.String(),
	}, mgutil.Set(bson.M{
		accountIDField: aid.String(),
		photoblobidField: bid.String(),
	}), options.Update().SetUpsert(true))
	return err
}

func byAccountID(aid id.AccountID) bson.M {
	return bson.M{
		accountIDField: aid,
	}
}
