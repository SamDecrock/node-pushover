/*
Copyright (c) 2020 Sam Decrock <sam.decrock@gmail.com>

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var httpreq = require('httpreq');

function Pushover(options) {
	if(!options.token) {
		throw new Error('No app token defined');
		return;
	}

	this.token = options.token;
	if(options.user)
		this.user = options.user;

	return this;
}

/**
 * send([user,] title, message, [image], [callback])
 */
Pushover.prototype.send = function(arg1, arg2, arg3, arg4, arg5) {
	if( arguments.length == 2 ){
		// (title, message)
		if(!this.user) {
			throw new Error('No user token defined');
			return;
		}

		send({
			token: this.token,
			user: this.user,
			title: arg1,
			message: arg2
		}, null, null);
	}

	if( arguments.length == 3 ){
		if(typeof(arg3)==="function"){
			// (title, message, callback)
			if(!this.user) {
				throw new Error('No user token defined');
				return;
			}
			send({
				token: this.token,
				user: this.user,
				title: arg1,
				message: arg2
			}, null, arg3);

		}else{
			// (user, title, message)
			send({
				token: this.token,
				user: arg1,
				title: arg2,
				message: arg3
			}, null, null);

		}
	}

	if( arguments.length == 4 ){
		// (user, title, message, callback/image)
		if (typeof arg4 === 'function') {
			send({
				token: this.token,
				user: arg1,
				title: arg2,
				message: arg3
			}, null, arg4);
		}else{
			send({
				token: this.token,
				user: arg1,
				title: arg2,
				message: arg3
			}, arg4, null);
		}

	}

	if( arguments.length == 5 ){
		// (user, title, message, image, callback)
		send({
			token: this.token,
			user: arg1,
			title: arg2,
			message: arg3
		}, arg4, arg5);
	}
};

function send(parameters, image, callback) {
	var options = { parameters: parameters };
	if(image) options.files = {attachment: image}; // key is used as parameter name

	httpreq.post("https://api.pushover.net/1/messages.json", options, function (err, res){
		if (callback && typeof callback === "function"){
			if(err){
				callback(err);
			}else{
				var response = JSON.parse(res.body);
				if(response.status != 1) {
					callback(response);
				} else {
					callback(null, response);
				}
			}
		}
	});
}

module.exports = Pushover;


