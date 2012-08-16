var querystring = require('querystring');
var https = require('https');
	
function send(options, callback) {
	var params = querystring.stringify(options);

	var post_options = {
		host: "api.pushover.net",
		port: 443,
		path: "/1/messages.json ",
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': params.length
		}
	}; 

	var post_req = https.request(post_options, function(res) {
		res.setEncoding('utf8');

		res.on('data', function (chunk) {
			var response = JSON.parse(chunk);
			if(response.status != 1) {
				if (callback && typeof callback === "function")	callback(response);
			} else {
				if (callback && typeof callback === "function")	callback(null, response);
			}
		});

		res.on('close', function (err) {
			callback(err);
		});
	});

	post_req.write(params);
	post_req.end();
}

exports.send = send;