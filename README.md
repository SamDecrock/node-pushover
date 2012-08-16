node-pushover
=============

node.js pushover module for https://pushover.net/api

## Quick Example

```js
var pushover = require('node-pushover');

pushover.send({  
	token: "YOUR APP TOKEN",
	user: "USER KEY",
	title: "Node",
	message: "Node.js is so cool!"
}, function(err, response){
	if (err){
		console.error("Error sending pushover");
		console.error(err);
	}else{
		console.log("Sending pushover complete");
		console.log(response);
	}
});
```
