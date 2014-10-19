'use strict';

var database = require("../database/driver");
var db =database.connect();



exports.getNodes = function(req, res) {
  console.log('[data.js] GET getdata');
  db.collection('data').find().toArray(function(err, result) {
    if (err){
      res.status(500).json({error:3});
    }else{
      console.log("[data.js] result: "+JSON.stringify(result));
      res.status(200).json(result);
    }       
  }); 
};





exports.createNode = function(req, res, postData) {
  console.log('[data.js] POST createnode');
  console.log("Req params: " + JSON.stringify(req.body));
  var postData=req.body;
  console.log(JSON.stringify(postData));
  var jsonPostData=JSON.stringify(postData);

  db.collection('data').insert(postData,function(err, result) {
    if (err){
      res.status(500).json({error:3});
    }else{
      res.status(200).json({error:0});
    }
  }); 
};


exports.updateNodeInfo = function(req, res, postData) {
  console.log('[data.js] UPDATE updateInfo');
  // var postData=req.body;
  // console.log(JSON.stringify(postData));
  console.log("{current nodeId: "+req.param("id")+" ; name: "+req.param("name")+" ; email: "+req.param("email")+" ; phone: "+req.param("phone")+"}");
  
  db.collection('data').update({"nodeId":parseInt(req.param("id"))},{$set:{"name":req.param("name"),"nodename":req.param("nodename"),"phone":req.param("phone"),"email":req.param("email")}},function(err, result) {
  //db.collection('data').find({"nodeId":parseInt(req.param("id"))}).toArray(function(err, result) {
    if (err) {
      throw err;
      res.status(500).json({error:1});
    }else {
      console.log("[data.js]: node updated");
      res.status(200).json({error:0});               
    }//end of if error
  });

};

