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
app.post("/users/", function(req, res) { 
	dataUsers[i]={};
	dataUsers[i].name = req.body.user.name;
	dataUsers[i].score = req.body.user.score;
	
	let sendData = [];
	
	for (let m=0; m < dataUsers.length; m++) {
		sendData.push('user name - "' + dataUsers[m].name + '"; score - "' + dataUsers[m].score + '"<br>');
	}
	sendData.push(sendForm());
	res.send(sendData.join());
	i++;
});
app.get("/users/:id", function(req, res) { 
	let sendData = [];
	
	for (let m=0; m < dataUsers.length; m++) {
		if (req.params.id == dataUsers[m].name) {
			sendData.push('user name - "' + dataUsers[m].name + '"; score - "' + dataUsers[m].score + '"<br>');
		}
	}
	res.send(sendData.join());

	res.send('user ' + req.params.id);
});
app.put("/users/:id", function(req, res) { 
	res.send('user ' + req.params.id);
});
app.delete("/users/:id", function(req, res) { 
	res.send('user ' + req.params.id);
});

function sendForm() {
	return('<form method="post" action="">' +
    '<input type="hidden" name="_method" value="put" />' +
    '<input type="text" name="user[name]" />' +
    '<input type="text" name="user[score]" />' +
    '<input type="submit" value="Submit" />' +
'</form>');

}
app.listen(3000);