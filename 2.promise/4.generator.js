// generator 函数要用*来标识；
// 主要是配合promise解决异步调用的问题；
// yield 暂停，产出；
// 也可以传入值；
//将函数分割出好多个部分，调用一次next就会向下执行；
// 返回结果是一个迭代器；迭代器有next方法；
// let a = yield 'shantong'; //let a = 代表可以接入新值；
// yield 后面是value值; yield前面是next传进的值；
// 第一次next传入的值无效；
// 第二个next把值传给第一个yield；
// generator原理是将一个函数划分成若干个小函数，每次调用时移动指针，用swith case进行判断；继续调用下一个小函数；

function* read() {
    console.log(1); //1
    let a = yield 'shantong'; //let a = 代表可以接入新值；
    console.log(a); //100
    let b = yield 9;
    console.log(b); //88
    return b;
}

let it = read();
console.log(it.next()); //{value：'shantong', done:false }
console.log(it.next('100')); //{value：9, done:false } 将100传给a;
console.log(it.next('88')); //{value：9, done:false } 将88传给b;

// 异步
// generator 

let blueBird = require('bluebird');
let fs = require('fs');

let read = bluebird.promisify(fs.readFile);

function* r() {
    let content1 = yield read('./2.promise/1.txt', 'utf8');
    let content2 = yield read(content1);
    return content2;
}

// let it = r();
// it.next().value.then(function (data) { //1.txt中的内容； it.next().value 就是第一个文件的内容；
//     it.next(data).value.then(function (data) { //把上一个文件的内容传给content1
//         it.next(data).value; //把内容传给content2
//     })
// });

// co库 npm install co --save
// tj 大神写的；
// 自动迭代generator
let co = require('co');
function co(it) {
    return new Promise(function (resolve, reject) {
        function next(d) {
            let { value, done } = it.next(d);
            // 因为是promise所以不能有while 循环或者for循环；
            if (!done) {
                value.then(function (data) {
                    next(data);
                }, reject)
            } else {
                resolve(value);
            }
        }
        next();
    })
}

// 用co库来解决generator中next运行时产生过多回调的问题；
co(r()).then(function (data) {
    console.log(data);
})

