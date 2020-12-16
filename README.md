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

### push.send([USERKEY,] title, message, [image], [,callback])

__Arguments__
 - USERKEY: (optional) The __USERKEY__ as given to you by the Pushover API.
 - title: The title for your message
 - message: The content for your message
 - image: (optional) Path to image if you want to attach an image
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
	if(err) return console.log(err);
	console.log(res);
});
```


__Example with the USERKEY given when the message is send__

```js
var Pushover = require('node-pushover');
var push = new Pushover({
	token: "APPTOKEN"
});
var path = require('path');

// No callback function defined:
push.send("USERKEY", "Some title", "Node.js is Cool!! - no callback");

// A callback function is defined:
push.send("USERKEY", "Some title", "Node.js is Cool!!", function (err, res) {
	if(err) return console.log(err);
	console.log(res);
});

// Attach image:
push.send("USERKEY", "Some title", "Node.js is Cool!!", path.join(__dirname, 'your-image.jpg'), function (err, res) {
	if(err) return console.log(err);
	console.log(res);
});
```

## License (MIT)

Copyright (c) Sam Decrock <https://github.com/SamDecrock/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

