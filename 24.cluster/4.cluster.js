// 集群
const cluster = require('cluster');
const cpus = require('os').cpus().length;
const http = require('http');

let isMater = cluster.isMaster //是否是主进程；

// 根据CPU的内核数，创建对应的进程数量；
// 各进程可以通信，ipc通信
// 默认不支持pipe方式

if (isMater) {
    // 开启pipe
    cluster.setupMaster({
        stdio:'pipe'
    })

    // 可以创建子进程
    // let worker = cluster.fork();//fork几次，子进程就走几次；
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

} else {
    http.createServer(function (req, res) {

        res.end('ok' + process.pid);
        process.send();//ipc方式进行通信；

    }).listen(3000);

    // process.exit();
    // process.disconnect(); // 断开连接；
}
// cluster.on('fork', function (worker) {
//     console.log(worker.id);//几次 ID就是几
// });
// cluster.on('disconnect', function (worker) {
// });
// cluster.on('exit', function (worker) {
// });

