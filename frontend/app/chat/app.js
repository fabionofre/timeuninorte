var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {};

app.get('/', function(req, res){
  res.send('server is running');
});

//SocketIO vem aqui
io.on("connection", function (client) {
  client.on("join", function(name){
    console.log("Entrou: " + name);
    clients[client.id] = name;
    client.emit("update", "Vocês está conectado no chat.");
    client.broadcast.emit("update", name + " entrou no chat.")
  });

  client.on("send", function(msg){
    console.log("Message: " + msg);
    client.broadcast.emit("chat", clients[client.id], msg);
  });

  client.on("disconnect", function(){
    console.log("Disconnect");
    io.emit("update", clients[client.id] + " saiu do chat.");
    delete clients[client.id];
  });
});


io.on("connection", function (client) {
    console.log('Usuário Conectado');
});

http.listen(4000, function(){
	console.log('Escutando na porta 4000');
});