const { spawn } = require('child_process');
const path = require('path');

// 子进程不受控于主进程；可独立运行
// unref()
let fd = require('fs').openSync('./100.txt', 'w')
let child = spawn('node', ['detach.js', 'a', 'b'], {
    cwd: path.join(__dirname, 'pro'),
    stdio: ['ignore', fd, 'ignore'], //文件描述符;自定义文件描述符第一个参数不可改
    detached:true //放弃控制权
});

child.unref();//子进程可以单独运行



