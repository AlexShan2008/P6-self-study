// 集群
const cluster = require('cluster');
const cpus = require('os').cpus().length;
const http = require('http');
const path = require('path');

cluster.setupMaster({
    exec: path.join(__dirname, 'subprocess.js')
})

for (let i = 0; i < cpus; i++) {
    cluster.fork();
}

