'use strict';

const querystring = require('querystring');
const http = require('http');

const dataPost = {};
dataPost.firstName = "Mark";
dataPost.lastName = "Tomilo";

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