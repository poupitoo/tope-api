function connect(){
	var db = require('mongoskin').db('mongodb://demo:demo@ds043220.mongolab.com:43220/hackathon-top', {safe:true});
		console.log("[database.js] databased used: "+JSON.stringify(db));
		return db;
		
	}
exports.connect=connect;
