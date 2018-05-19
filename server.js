const express = require('express');
const hbs = require('hbs');
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://mongodb-stitch-sample-ipjjx:7gShZY30dHAhodZ0@cluster0-cdzyn.mongodb.net/admin";

var app = express();
var randomstring = require("randomstring");

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
        currentYear: new Date().getFullYear()
    })
});

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

// app.get('/about', (req, res) => {
//     res.render('about.hbs', {
//         pageTitle: 'About Page',
//         currentYear: new Date().getFullYear()
//     })
//     res.send('About Page');
// });

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'  
    })
});

app.listen(3000, () => {
    console.log('server is up and running...port 3000');
});
