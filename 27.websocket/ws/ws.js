const net = require('http');
// 用TCP协议模拟websocket协议
const server = net.createServer(function (socket) {
  socket.on('data', function () {
    // data Buffer
    let headerStr = data.toString();

    if (/Upgrade: websocket/.test(headerStr)) {
      let segments = headerStr.split('\r\n');
      segments = segments.slice(1, - 2);

      let headers = segments.reduce((current, next) => {
        let { key, value } = next.split(': ');
        current[key.toLowerCase()] = value;
        return current;

      }, {});
    }
  });

  socket.on('end', function () {
    socket.destroy();
  });
});

server.listen(9999);