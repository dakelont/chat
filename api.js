'use strict';

const querystring = require('querystring');
const http = require('http');

var server = http.createServer();

server.on('request', function(req, response) {
    response.writeHead(200);
    let getQuery = require('url').parse(req.url, true);
	
	const dataPost = {};
	dataPost.firstName = getQuery.query.firstName;
	dataPost.lastName = getQuery.query.lastName;
	
	let data = querystring.stringify(dataPost);

	let options = {
		hostname: 'netology.tomilomark.ru',
		port: 80,
		path: '/api/v1/hash',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(data)
		}
	};

	let httpreq = http.request(options, function (response) {
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			chunk = JSON.parse(chunk);
			dataPost.hash = chunk.hash;
			console.log(dataPost);
		});
	  });
	httpreq.write(data);
	httpreq.end();
});

server.listen(8081); 
