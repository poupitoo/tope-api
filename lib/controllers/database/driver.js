function connect(){
	var db = require('mongoskin').db('mongodb://demo:demo@ds043220.mongolab.com:43220/hackathon-top', {safe:true});
		return db;
		
	}
exports.connect=connect;
