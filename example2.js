var Pushover = require('./pushover');
var push = new Pushover({
	token: "APPTOKEN"
});

// No callback function defined:
push.send("USERKEY", "Some title", "Node.js is Cool!! - no callback");

// A callback function is defined:
push.send("USERKEY", "Some title", "Node.js is Cool!!", function (err, res){
	if(err){
		console.log("We have an error:");
		console.log(err);
		console.log(err.stack);
	}else{
		console.log("Message send successfully");
		console.log(res);
	}
});