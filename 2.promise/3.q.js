// npm install q
// angular.js中使用

let promise = require('./Promise');

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

let Q = require('q');
Q.all([read('./2.promise/1.txt'), read('./2.promise/2.txt')]).spread(function (data) {
    console.log(data);
})

// 同promise.all
Q.fcall(function () {
    return 100;
}).then(function (data) {
    console.log(data);
})

// defer

// blueBird
let blueBird = require('blueBird');
// promise化，将回调函数在内部进行处理；
function promisify(fn) {
    return function (...args) {
        return new Promise(function (resolve, reject) {
            fn(...args, function (err, data) {
                if (err) return reject(err);
                resolve(data);
            })
        })
    }

}
// 将多个方法转为promise
function promisifyAll(obj) {
    // 将obj的key值抽离出来存为数组；
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'function') {
            obj[key + 'Async'] = promisify(obj[key]);
        }
    })
}


let read = blueBird.promisify(fs.readFile);

//将多个方法全部都转为Promise；包装后的方法名加了；readFileAsync
let read = blueBird.promisifyAll(fs);
read('./2.promise/1.txt', 'urf8').then(function (data) {
    console.log(data);
})



