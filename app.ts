///<reference path='node/node.d.ts' />
///<reference path='node/express.d.ts' />

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var io = require('socket.io');
var app = express();

app.configure(()=>{
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', ()=>{
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/form', routes.form);
app.get('/chat', routes.chat);
app.post('/create', routes.create);

var server = http.createServer(app);
server.listen(app.get('port'), ()=>{
  console.log("Express server listening on port " + app.get('port'));
});

var socket = io.listen(server);
socket.on("connection", (client)=>{
  client.emit("receiveMsg", "接続しました。");
  /*
  setInterval(function(){
    client.emit("receiveMsg", new Date());
  }, 5000);
  */
  client.on("sendMsg", (message)=>{
    client.emit("receiveMsg", message);
    client.broadcast.emit("receiveMsg", message);
  });
  client.on("disconnect", ()=>{
    client.broadcast.emit("disconnected");
  });
});
