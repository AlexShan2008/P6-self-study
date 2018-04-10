// const { fork } = require('child_process');
const { spawn } = require('child_process');
const path = require('path');

function fork(modulePath, args, options = {}) {
    if (options.silent) {
        options.stdio = ['ignore', 'ignore', 'ignore', 'ipc']
    } else {
        options.stdio = [0, 1, 2, 'ipc']
    }
    return spawn('node', [modulePath, ...args])
}


// 子进程不受控于主进程；可独立运行
// unref()
let fd = require('fs').openSync('./100.txt', 'w')
let child = fork('fork.js', ['a', 'b'], {
    cwd: path.join(__dirname, 'pro'),
    silent: true//['ignore','ignore','ignore','ipc']
});
// 默认支持ipc 方法
// 默认的方法  stdio:[0,1,2,'ipc']
child.send('hello');


