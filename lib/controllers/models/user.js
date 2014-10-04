'use strict';

var database = require("../database/driver");
var db =database.connect();



exports.getUsers = function(req, res) {
  console.log('[user.js] GET getUsers');

  db.collection('users').find().toArray(function(err, result) {
    if (err){
      res.status(500).json({error:3});
    }else{
      console.log("[user.js] result: "+JSON.stringify(result));
      res.status(200).json(result);
    }       
  }); 

};



exports.createUser = function(req, res, postData) {
  console.log('[user.js] POST createUser');
  // var postData=req.body;
  // console.log(JSON.stringify(postData));
  
  db.collection('users').find().toArray(function(err, result) {
    if (err){
      res.status(500).json({error:3});
    }else{
      var newId=result.length;
      db.collection('users').save({'userId':newId}, function(err) {   
        if (err) {
          throw err;
          console.log("[user.js] error:"+err);
          res.status(500).json({error:1});
        }else {
          console.log("[user.js]: user added");
          res.status(200).json({"id":newId});
        }
      }); 
    }       
  }); 
};


exports.updateInfo = function(req, res, postData) {
  console.log('[user.js] UPDATE updateInfo');
  // var postData=req.body;
  // console.log(JSON.stringify(postData));
  console.log("{current userId: "+req.param("id")+" ; name: "+req.param("name")+" ; email: "+req.param("email")+" ; phone: "+req.param("phone")+"}");
  


  db.collection('users').update({"userId":parseInt(req.param("id"))},{$set:{"name":req.param("name"),"username":req.param("username"),"phone":req.param("phone"),"email":req.param("email")}},function(err, result) {
  //db.collection('users').find({"userId":parseInt(req.param("id"))}).toArray(function(err, result) {
    if (err) {
      throw err;
      res.status(500).json({error:1});
    }else {
      console.log("[user.js]: user updated");
      res.status(200).json({error:0});               
    }//end of if error
  });

};
