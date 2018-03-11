let Promise = require('./Promise');
// let p = new Promise(function (resolve, reject) {
// resolve(100);
// reject(100);

// setTimeout(() => {
//     resolve(100);
// }, 1000);

// throw new Error("throw a new error");

// 链式调用；
// resolve('8888');
//     reject('8888');
// })
// p.then(function (data) {
//     console.log("success", data);
// }, function (error) {
//     // throw new Error("rrrr");
//     console.log("1");
//     return 'success';
// }).then(function (data) {
//     console.log("success", data);
// }, function (error) {
//     console.log("error", error);
// })

// 1.promise实例可以多次then;当成功后会将then中的成功方法按顺序执行；
// 我们可以先将then中成功的、失败的回调，存在两个数组中；
// 当成功时，调用成功数组；
// 当失败时，调用失败数组；

// 2.链式调用，jquery就是靠return this;
// Promise不能返回this；

// let p = new Promise(function (resolve, reject) {
//     resolve();
// })
// let p2 = p.then(function () {
//     throw new Error("new Error; new Promise")
// });
// p2.then(function () {

// }, function (error) {
//     console.log("p2", error);
// })


// 3.无论then中返回的是成功回调还是失败回调，只要返回了结果，就会走下一个
// then中成功回调；如果有报错，就会走下一个失败回调；

// 4.第一个then返回的普通值，会走下一个then中的成功回调；
// 5.如果第一个Promise返回了一个promise，需要等待返回的promise执行后的
// 结果传递给下一个then；

// 6.resolvePromise
// var p = new Promise(function(resolve,reject){
//     return new Promise(function(resolve,reject){
//         resolve(100);
//     })
// })
// p.then(function(data){
//     console.log('success', data);
// }, function (error){
// console.log(error);

// })

// 7.判断x是不是Promise;如果是对象，并且有then方法，就认为是；

// 8.有些人写的promise可能既调用成功，又调用失败；如果两个都调用，先调用谁，另一个就忽略掉；

// 9.值的穿透；
// p.then().then().then(function (resolve, rejcet) {

// });

// 10.规范中，所有的onFulfilled和onRejected都需要异步执行，setTimeout

// 11. 下载一个Promise的测试库，promises-aplus-tests
// npm install promises-aplus-tests -g 
// 命令行测试工具命令： promise-aplus-tests  fileName 

// let Promise = require('./Promise');
// function read() {
//     let defer = Promise.defer();
//     require('./2.promise/1.txt', 'utf8', function (err, data) {
//         if (err) {
//             defer.rejcet(err);
//         }
//         dfdeferd.resolve(data);
//     });
//     return defer.promise;
// }

// read().then(function(data){

// },function(error){

// })


//  catch 
// let promise = new Promise(function (resolve, reject) {
//     reject('error');
// })
// promise.then(function () {

// }).catch(e => {
//     console.log(e);
// })



function read(url) {
    return new Promise(function (resolve, reject) {
        require(url, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

// all 
Promise.all([read('./2.promise/1.txt'), read('./2.promise/2.txt')]).then(function (data) {
    console.log(data);
})

// race 赛跑；
Promise.race([read('./2.promise/1.txt'), read('./2.promise/2.txt')]).then(function (data) {
    console.log(data);
})
