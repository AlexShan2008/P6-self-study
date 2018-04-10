// node 实现子进程 child_process
// 可以创建一个子进程；不会影响当前的事件环；
// 多进程
// 电脑 多核CPU 如果在Node只开一个进程，只会占用一个cpu

// const os =require('os').cpus().length;//获取电脑内核个数；4核
// console.log(os);

// 爬虫负责爬，子进程

// 创建子进程；进程间通信
// node不适合负责逻辑运算；cpu密集

// spawn 生成 fork 叉子 exec 执行  execFile 执行文件
const { spawn } = require('child_process');
const path = require('path');
// node filename.js -v -s 
let child = spawn('node', ['1.test.js', 'a', 'b'], {
    cwd: path.join(__dirname, 'pro'),//文件夹下
    stdio: 'inherit' //[process.stdin,process.stdout,process.stderr] or [0,1,2] 默认是'pipe'
});

// 主进程内包含：监听输入
// 1.process.stdin   0  标准输入
// 2.process.stdout  1  标准输出
// 3.process.stderr  2  错误输出

// 默认是通过管道建立通信
child.stdout.on('data',function(data){
    console.log(data.toString());//Buffer
})


child.on('exit',function(){
    console.log('exit');
});
child.on('close', function () {
    console.log('close');
});
child.on('error', function (err) {
    console.log(err);
});



// 