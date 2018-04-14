const http = require('http');

http.createServer(function (req, res) {
    console.log(process.pid);

    res.end('ok' + process.pid);
    process.send();//ipc方式进行通信；

}).listen(3000);