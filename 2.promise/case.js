let Promise = require('./Promise');
let p = new Promise(function (resolve, reject) {
    // resolve(100);
    reject(100);
})
p.then(function (data) {
    console.log("success", data);

}, function (error) {
    console.log("error", error);
})