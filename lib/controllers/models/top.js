'use strict';

var database = require("../database/driver");
var db =database.connect();

exports.checkTop = function(req, res) {
  console.log('[top.js] GET checkTop');
  console.log("{current userId: "+req.param("userId")+" ; timestamp: "+req.param("timestamp")+"}");
  var userId = parseInt(req.param("userId"));
  var timestamp = parseInt(req.param("timestamp"));
  //userId
  //timestamp


  //db.collection('tops').find({"timestamp":parseInt(req.param("timestamp")),"firstUser":{$ne:userId}}).toArray(function(err, result) {
  db.collection('tops').find({"timestamp":parseInt(req.param("timestamp"))}).toArray(function(err, result) {

    if (err){
      res.status(500).json({error:3});
    }else{

      //User A: First request between the 2 parallel requests
      if(result==0){ 
        //We save then the first request with the specific timestamp and the user id
        db.collection('tops').save({"case":1,'firstUser':userId,"timestamp":parseInt(req.param("timestamp"))}, function(err) {   
          if (err) {
            throw err;
            console.log("[top.js] error:"+err);
            res.status(500).json({error:1});
          }else {
            console.log("[top.js]: top added");
            res.status(200).json({"case":1});
            //The user must retry a call in 1 second 
          }
        }); 
      
      }else{//result=1 or 2

        if(result[0].firstUser==userId){
          //User A: Second Call
          //need to get User b id -> Present if case=3 else retry
          if(result[0].case == 3){
            res.status(200).json({"case":3,"id":result[0].secondUser});
            //Can delete node here
            db.collection('tops').delete({"timestamp":parseInt(req.param("timestamp"))});
          }else{
            //Still waiting for User B
            res.status(200).json({"case":1});
            //The user must retry a call in 1 second 
          }

        }else{
          //User B: Second request between the 2 parallel requests        
          db.collection('tops').update({'timestamp':timestamp},{$set:{'secondUser':userId,'case':3}}, function(err) { 
            if (err) {
              throw err;
              console.log("[top.js] error:"+err);
              res.status(500).json({error:1});
            }else {
              console.log("[top.js]: top updated by User B");
              res.status(200).json({"case":2,"id":result[0].firstUser});
            }
          }); 

        }

      }

    }       
  }); 


};