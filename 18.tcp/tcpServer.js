let net = require('net');

let server = net.createServer(function(socket){
    socket.on('data',function(data){
        console.log(data)
    })
});

server.on('connection',function(){
    console.log("server end")
});
server.listen(8080);