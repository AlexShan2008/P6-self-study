const { spawn } = require('child_process');
const path = require('path');

// fork 方式 
let child = spawn('node', ['3.ipc.js', 'a', 'b'], {
    cwd: path.join(__dirname, 'pro'),
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
})

// ignore 不要子进程数据
// ipc  至此ipc通信

child.send({ name: "shantong" });

child.on('message',function(data){
    console.log(data)
    child.kill();
});