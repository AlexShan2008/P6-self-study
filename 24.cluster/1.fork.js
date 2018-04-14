let { fork } = require('child_process');
const path = require('path');

// 集群处理；当父进程处理不了时，会让子进程进行处理

let child = fork('http.js', {
    cwd: path.join(__dirname, 'test')
});

let http = require('http');
let serve = http.createServer(function (req, res) {
    res.send('父进程');
}).listen(3000);

child.send('server', server);
