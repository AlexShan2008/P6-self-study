// 异步的发展流程

// 同步 连续执行，线性  
// 异步 不连续执行 先干一件事，中间可以暂停，最后回来干此事
// Node支持异步
// callback  ->promise -> generator + co -> async/await(语法糖)
// 先读文件，读完再写

let fs = require('fs'); //readFile
// 异步不支持try catch;只针对同步代码；
fs.readFile('./2.promise/1.txt', 'utf8', function (err, data) {
    // error first
    fs.readFile(data, 'utf8', function (err, data) {
        console.log(data);
    })
})

// 并行 无法在同一时刻合并两个异步的结果,异步不支持回调函数；
fs.readFile('./2.promise/1.txt', 'utf8', function (err, data) {
    console.log(data);
})
fs.readFile('./2.promise/2.txt', 'utf8', function (err, data) {
    console.log(data);
})

// 高阶函数；满足下面两个条件之一就算：
// 1.函数可以作为参数传递；
// 2.函数还可以作为返回值；
function isType(type, content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`
}

var res = isType('String', 'Hello');
var res = isType('Array', 'Hello');
console.log(res);

//1) 批量生成函数；
function isType(type) {
    // 偏函数；
    return function (content) {
        return Object.prototype.toString.call(content) === `[object ${type}]`
    }
}
let isString = isType('String');
let isArray = isType('Array');
console.log(isString('hello'));

// 2) 预置函数 loadsh _.after

function after(times, callback) {
    return function () {
        if (--times === 0) {
            callback();
        }
    }
}
let eat = after(3, function (params) {
    console.log('OK');
});
eat();
eat();
eat();//第三次调用才执行；

// 
let fs = require('fs');
// 缓存函数，当达到条件时执行；
function after(times, callback) {
    let arr = [];
    return function (data) {
        arr.push(data);
        if (--times === 0) {
            callback(arr);
        }
    }
}
let out = after(2, function (data) {
    console.log(data);
});
fs.readFile('./2.promise/1.txt', 'utf8', function (err, data) {
    out(data);
});
fs.readFile('./2.promise/2.txt', 'utf8', function (err, data) {
    out(data);
});


// Promise主要是解决回调地狱的问题；依靠then来保证；
// 解决同步异步的返回结果，并且按照顺序返回；