// 在浏览器端 全局作用域window
// Node端 可以直接访问global

// node执行的时候，为了实现模块化，增加了一个闭包

var a = 1;
console.log(global.a);

// 1.console
// 标准输出；是1表示
console.log("log");
console.info("info");

// 错误输出；是2表示 2>&1 
// node 1.node.js > 1.log 2>&1 
console.warn("warn");
console.error("error");

// 默认有些熟悉是隐藏属性；
console.dir(Array.prototype, { showHidden: true })

// time 和timeEnd中的内容是一对；名字必须相同；
console.time("time");

for (let i = 0; i < 100; i++) {

}
console.timeEnd("time");

// stack 指的就是diam的call stack
// 代码的执行顺序从上到下；
// 函数调用是从上到下；

console.log(1);
function one(params) {
    var a = 2;
    console.log(a);
    two();
    function two(params) {
        var b = 3;
        console.log(b);
        three();
        function three(params) {
            console.log(4);
            // console.trace();
        }
    }

}
one();

// 断言 会抛出一个AccertExcetion，测试Mocha karma
// 断言库  
// node自带的 asert
// console.assert((1+1)=== 2,"error");

// console.log(global)

// process进程
// argv 命令行工具时传递参数；
// pid 进程id; 端口占用，任务管理器 -> 进程 -> 详情信息 
// Mac lsof -i :8080  kill -9 pid
// chdir change directory 工作目录  
// cwd current working directory 当前工作目录
// nextTick 微任务
// stdout stderr stdin
// Buffer 存储文件内容 二进制
// setImmediate 设置立即
// setInterval
// setTimeout

console.log(process.cwd());
//vscode环境下获取的路径是 c:\Users\ShanGuo\Workspace\P6-self-study 根目录
// C:\Users\ShanGuo\Workspace\P6-self-study\4.node  

process.chdir("..") //返回上级目录；更改当前所在文件目录；

// __dirname node自带的属性；这个不是global上的 但是可以直接使用
console.log(__dirname);
// __dirname c:\Users\ShanGuo\Workspace\P6-self-study\4.node 永远指代当前文件所在的文件夹

// 标准输出 1 下面两个等价，调用相同方法
process.stdout.write(1);
console.log(1);

// 错误输出 2 下面两个等价，调用相同方法
process.stderr.write(1);
console.error(1);

// 微任务 
// then  (messageChannel mutationObserve 浏览器)
// nextTick node

// 宏任务
// setTimeout setInterval 
// setImmediate node 

// 浏览器中先执行当前栈，执行完走微任务，走事件队列里的任务（只取出一个任务）放到执行栈中执行，
// 再去取微任务；
console.log(1);
console.log(2);
setTimeout(function (params) {
    console.log("setTimeout1");

    Promise.resolve().then(function (params) {
        console.log("promise");

    })
}, 0)
setTimeout(() => {
    console.log("setTimeout2");

}, 0);
console.log(3);

// node中先执行当前栈，执行完走微任务，走事件队列里的任务（所有任务）放到执行栈中执行，
// node 端输出 
// 1
// 2
// 3
// setTimeout1
// setTimeout2
// promise

// 浏览器端
// 1
// 2
// 3
// setTimeout1
// promise
// setTimeout2

// nextTick then
// 都是在 阶段转换 时才调用；就是清空callback(执行栈)的时候；

process.nextTick(function (params) {
    // 微任务
    console.log("nextTick");

})
setImmediate(function () {
    // 宏任务
    console.log("setImmediate");
})


// setTimeout  setImmediate 执行顺序不确定 取决于Node的执行时间
// setTimeout 默认4ms（浏览器）
setTimeout(function (params) {
    console.log("setTimeout");

})
setImmediate(function () {
    console.log("setImmediate");
})

// i/o读写，文件操作 宏任务
let fs = require('fs');
fs.readFile('./1.log', function (params) {
    console.log("fs");
});
process.nextTick(function (params) {
    console.log("nextTick");
})

// nextTick
// fs
// i/o异步操作完成会走check阶段，所以setImmediate会先走；
let fs = require('fs');
fs.readFile('./1.log', function (params) {
    console.log("fs");
    setTimeout(function () {
        console.log("setTimeout");
    });
    setImmediate(function () {
        console.log("setImmediate");
    })
});
process.nextTick(function (params) {
    console.log("nextTick");
})

// fs
// setImmediate
// setTimeout


// nextTick nextTick会先于then执行
// then

Promise.resolve().then(function () {
    console.log("then");
})
process.nextTick(function (params) {
    console.log("nextTick");
})

setImmediate(function (params) {
    console.log(1);
});

// 
setImmediate(function (params) {
    console.log(1);
    process.nextTick(function (params) {
        console.log("2");
    })
})
process.nextTick(function (params) {
    console.log(3);
    setImmediate(function (params) {
        console.log(4);
    })
})
// setImmediate nextTick
// setImmediate setImmediate
// nextTick
// 一次性清空 setImmediate
// 3
// 1
// 4
// 2
function Fn(params) {
    this.arrs;
    process.nextTick(()=>{
        // 先赋值，在实例化以后再变成方法；
        // 
        this.arrs();
    })
    // this.arrs();//this.arrs is not a function
    
}
Fn.prototype.then = function () {
    this.arrs = function () {
        console.log(1);
    }
}
let fn = new Fn();
fn.then();//实例化调用this.arrs方法；

// nextTick千万不要写递归；可以放一下比setTimeout优先执行的任务；
