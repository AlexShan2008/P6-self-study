let blueBird = require('bluebird');
let fs = require('fs');
let read = blueBird.promisify(fs.readFile);

// async 来修饰函数，async需要配await；await只能跟promise；
// async的原理就是generator和co的实现；
// 解决的问题：
// 1.回调地狱；
// 2.并发执行异步，在同一时刻同步返回结果promise.all
// 3.返回值的问题；
// 4.可以实现代码的try/catch;

async function r(params) {
    try {
        let content1 = await read('./2.promise/1.txt', 'utf8');
        let content2 = await read(content1, 'utf8');
        return content2; //返回到then中
    } catch (e) {
        console.log(e);
    }
}

// async函数返回的是promise;
// try catch 可以和下面then同时并用，一般只用一个就可以；
r().then(function (data) {
    console.log('success', data);
}, function (error) {
    console.log('err', error);
})