// 用来执行文件；
let { execFile } = require('child_process');

// spawn execFile 都是异步的；但是execFile输出结果是同步的，等结束后一起接受；maxBuffer: 100  可选
execFile('node', ['-v'], { maxBuffer: 100 }, function (err, stdout, stderr) {
    console.log(stdout);
});

// 也可以执行文件，
execFile('1.fock', ['-v'], { maxBuffer: 100 }, function (err, stdout, stderr) {
    console.log(stdout);
});

// 用来执行命令；
let { exec } = require('child_process');
// exec('ls -l',function (err, stdout, stderr) {
//     console.log(stdout);
// });

// 打开浏览器  mac 命令是open
exec('start http://localhost:3000', function (err, stdout, stderr) {
    console.log(stdout);
});