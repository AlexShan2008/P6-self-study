let Promise = require('./Promise');


let promise = new Promise(function (resolve, reject) {
    // resolve(1000);
    // return new Promise(function (resolve, reject) {
    //     setTimeout(() => {
    //         reject(999);
    //     }, 1000);
    // })
    reject(999);
    
})

promise.then(function (data) {

}, function (error) {

    console.log(error);
}).then(function (data) {
    console.log('success', data);
    return 100;
}, function (error) {
    console.log('error', error);
})