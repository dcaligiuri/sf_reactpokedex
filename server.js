const express = require('express');
const path = require('path');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_gcqllm80:38ek24skubgto7pkei0g8d9oe7@ds153851.mlab.com:53851/heroku_gcqllm80";
var ObjectId = require('mongoose').Types.ObjectId; 



const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// API calls

app.get('*', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
  
  
const port = process.env.PORT || 5000;
app.listen(port, () => `Server running on port ${port}`);