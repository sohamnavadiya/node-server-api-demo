const express = require('express');
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://mongodb-stitch-sample-ipjjx:7gShZY30dHAhodZ0@cluster0-cdzyn.mongodb.net/admin";

const port = process.env.PORT || 3002;
var app = express();
var randomstring = require("randomstring");

app.set('view engine', 'hbs');

app.get('/about', (req, res) => {
    
    MongoClient.connect(uri, function(err, db){
        const a = randomstring.generate(7);
        const b = randomstring.generate({
            length: 12,
            charset: 'alphabetic'
          });
        
        var _obj = { company_name: a, address: b };
        if (err) throw err;
        var dbo = db.db("sample");
    
        dbo.collection("companies").insertOne(_obj, function(err, res){
             if(err) throw err;
             console.log("1 document inserted"); 
             db.close();
        });
        res.send({
            company_name: a,
            address: b,
            age: 24
        })
    });

   
});


app.listen(port, () => {
    console.log(`server is up and running...port ${port}`);
});
