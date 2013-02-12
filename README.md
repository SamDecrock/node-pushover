node-pushover
=============

node.js pushover module for https://pushover.net/api

## Install

You can install node-pushover using the Node Package Manager (npm):

    npm install node-pushover

## Initialization

### new Pushover({ token: "APPTOKEN" [, user: "USERKEY"]});

Initializes a Pushover object with the __APPTOKEN__ and optionally a __USERKEY__ . The __USERKEY__ can also be given when sending the messages.

## Sending messages

### push.send([USERKEY,] title, message [,callback])

__Arguments__
 - USERKEY: (optional) The __USERKEY__ as given to you by the Pushover API.
 - title: The title for your message
 - message: The content for your message
 - callback(err, res): (optional) A callback function which is called when the message is send.

__Example with the USERKEY given at initialisation__

```js
var Pushover = require('node-pushover');
var push = new Pushover({
	token: "APPTOKEN",
	user: "USERKEY"
});

// No callback function defined:
push.send("Some title", "Node.js is Cool!! - no callback");

// A callback function is defined:
push.send("Some title", "Node.js is Cool!!", function (err, res){
	if(err){
		console.log("We have an error:");
		console.log(err);
		console.log(err.stack);
	}else{
		console.log("Message send successfully");
		console.log(res);
	}
});
```


__Example with the USERKEY given when the message is send__

```js
var Pushover = require('node-pushover');
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
```
