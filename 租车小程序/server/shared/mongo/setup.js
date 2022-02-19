
db.account.createIndex({
    open_id: 1,
},{
    unique:true,
})

db.trip.createIndex({
    "trip.accountid":1,//从小到大的意思，并不代表值
    "trip.status":1,
},{
    unique:true,
    partialFilterExpression:{
        "trip.status":1,//此时的是值为1
    }
})

db.profile.createIndex({
    "accountid":1,
},{
    unique:true,
})