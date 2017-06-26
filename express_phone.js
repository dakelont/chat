const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/users";

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/users.html');
});

io.on('connection', function(socket){
	let users;
  
	/* получить всех пользователей */
	users = mongoConnect();
	io.emit('some event', users);
	/* // получить всех пользователей */
	
	socket.on('chat message', function(msg){
		 mongoConnect(msg);
		io.emit('chat message', users);
	});

	//socket.on('disconnect', function(){	});
});

function mongoConnect(query) {
	let result = {};
	mongoClient.connect(url, function(err, db){
		if (err) {
			console.log("Не удается подключиться к БД");
			result.err = 'Не удается подключиться к БД';
		}
		else {
			console.log("Соединение с БД установленно");
			let collection = db.collection("contacts");
			if (query == undefined) {
				collection.find(function(err, cursor) {
				  cursor.toArray(function(err, items) {
					  result.data = items;
				  });
				});
			}
			else {
				collection.insertOne(query, function(err, res){
					if(err){ 
						result.err = err;
					}
					result.data = res.ops;
				});
			}
		}
		db.close();
	});
	return result;
}

http.listen(3000, function(){
  console.log('Start server');
});
