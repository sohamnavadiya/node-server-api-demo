// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectId} = require("mongodb");

var obj = new ObjectId();
console.log(obj);

var user = {name: "Soham", age: 25};

var {name} = user;

console.log(name);


var uri = "mongodb+srv://mongodb-stitch-sample-ipjjx:7gShZY30dHAhodZ0@cluster0-cdzyn.mongodb.net/admin";

MongoClient.connect(uri, function(err, db){
   
    var _obj = { task: "abc", status: true };
    if (err) throw err;
    var dbo = db.db("to-do");

    // dbo.collection("task").insertOne(_obj, function(err, res){
    //      if(err) throw err;
    //      console.log("1 document inserted" + res.ops); 
    //      console.log(JSON.stringify(res.ops, undefined, 2)); 
    //      db.close();
    // });

    dbo.collection("Users").insertOne({
        _id : obj,
        name:"Soham",
        age:24,
        location:"Mumbai"
    }, (err, result) => {
        if (err){
            return console.log('Unable to insert user', err);
        }
        // console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
        console.log(JSON.stringify(result.ops, undefined, 2));
        db.close();
    });

    dbo.collection("Users").findOneAndUpdate({
        _id: obj
    }, {
        $set: {
            last_name: "kakadiya"
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    });
});








