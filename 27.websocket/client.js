const  WSServer = require('ws').Server;
const wsServer = new WSServer({port:8080});

// socket插座
wsServer.on('connection', function(socket){
  console.log('客户端已解决链接');
  // 监听客户端发过来的
  socket.on('message',function(message){
    console.log(message);
    socket.send('server:'+ message);
  });
});