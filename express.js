'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.get("/users", function(req, res) { 
	res.send(sendForm());
});
let dataUsers = [];
let i=0;

app.post("/users/add/", function(req, res) { 
	dataUsers[i]={};
	if (req.body.user.name && req.body.user.score) {
		dataUsers[i].name = req.body.user.name;
		dataUsers[i].score = req.body.user.score;
		
		let sendData = [];
		
		for (let m=0; m < dataUsers.length; m++) {
			sendData.push('user name - "' + dataUsers[m].name + '"; score - "' + dataUsers[m].score + '"<br>');
		}
		sendData.push(sendForm());
		res.send(sendData.join());
		i++;
		console.log('Пользователь успешно добавлен');
	}
	else {
		res.send(sendData.join());
		console.log('свойства name и score должны существовать');
	}
});
app.get("/users/show/:id", function(req, res) { 
	let sendData = [];
	let search=0;
	for (let m=0; m < dataUsers.length; m++) {
		if (req.params.id == dataUsers[m].name) {
			search=1;
			sendData.push('user name - "' + dataUsers[m].name + '"; score - "' + dataUsers[m].score + '"<br>');
		}
	}

	if (search==1) {
		sendData.push('user ' + req.params.id);
		console.log('Пользователь "' + req.params.id + '" успешно найден');
	}
	else {
		sendData.push('error');
		console.log('Пользователь "' + req.params.id + '" не найден');
	}
	res.send(sendData.join());
});
app.put("/users/update/:id", function(req, res) { 
	let sendData = [];
	let search=0;
	if (req.body.user.name && req.body.user.score) {
		for (let m=0; m < dataUsers.length; m++) {
			if (req.params.id == dataUsers[m].name) {
				search=1;
				dataUsers[m].name = req.body.user.name;
				dataUsers[m].score = req.body.user.score;
			}
			sendData.push('user name - "' + dataUsers[m].name + '"; score - "' + dataUsers[m].score + '"<br>');
		}
		
		sendData.push(sendForm());
		res.send(sendData.join());
		console.log('Пользователь успешно обновлен');
	}
	else {
		res.send(sendData.join());
		console.log('свойства name и score должны существовать');
	}
});
app.delete("/users/delete/:id", function(req, res) { 
	let sendData = [];
	let search=0;
	if (req.body.user.name) {
		for (let m=0; m < dataUsers.length; m++) {
			if (req.params.id == dataUsers[m].name) {
				search=1;
				dataUsers.remove(m);
			}
			else {
				sendData.push('user name - "' + dataUsers[m].name + '"; score - "' + dataUsers[m].score + '"<br>');
			}
		}
		
		sendData.push(sendForm());
		res.send(sendData.join());

		console.log('Пользователь успешно удален');
	}
	else {
		res.send(sendData.join());
		console.log('Пользователь не найден');
	}
	if (search==0) {
		res.send(sendData.join());
		console.log('Пользователь не найден');
	}

});
app.listen(3001);
console.log("Ready on port 3001");
