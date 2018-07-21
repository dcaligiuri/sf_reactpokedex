const express = require('express');
const app = express();





//var MongoClient = require('mongodb').MongoClient
 // , assert = require('assert');
//
// Connection URL
//var url = 'mongodb://heroku_0x82c341:9pbl84dbi9lanl7edeupmo261u@ds147011.mlab.com:47011/heroku_0x82c341';

// Use connect method to connect to the server








const port = process.env.PORT || 5000;
// API calls

app.use('/api/hello', (req, res) => {

    console.log("ACCECSS");

    //MongoClient.connect(url, (err, client) => {
        // Client returned
     //   var db = client.db('heroku_0x82c341');
      
    //      db.collection('pokemon').findOne({id: '1'}, function (findErr, result) {
    //          if (findErr) throw findErr;
    //          res.send({ pokemon: result });
     //         client.close();
     //     });
    //  });
      
  });
  
  app.listen(port, () => console.log(`Listening on port ${port}`));






function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    var headers=lines[0].split(",");

  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    //return result; //JavaScript object
    return result; //JSON
  }


const pokemon = ``;

const pokemonArr = csvJSON(pokemon);



/*var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://heroku_0x82c341:9pbl84dbi9lanl7edeupmo261u@ds147011.mlab.com:47011/heroku_0x82c341';

// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
  // Client returned
  var db = client.db('heroku_0x82c341');




for (let x = 0; x < pokemonArr.length; x++){

    db.collection('pokemonAbilities').insert(pokemonArr[x], function (findErr, result) {
        if (findErr) throw findErr;
        console.log(result);
        client.close();
    });
}

  

});
*/




//for (let x = 0; x < pokemonArr.length; x++){

    //console.log(pokemonArr[x]);
 //   db.pokemon.insertOne(
//        pokemonArr[x]
 //    );
///}

