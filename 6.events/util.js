// util是一个工具方法；

// util.inherits

// util.inspect

// util.promisify

let fs = require("fs");

let { promisify } = require("util");
let path = require("path");

let read = promisify(fs.readFile);
let util = require("util");

read(path.join(__dirname, "./1.txt"), "utf8").then(function (data) {
    console.log(data);

})

console.log(util.inspect(Array.prototype, { showHidden: true }));


// util.inherits 只继承共有方法

function A(params) {

}
function B(params) {

}
util.inherits(A,B);
let b = new A();
b.fn();

// A.prototype.__proto = B.prototype
// A.prototype = Object.create(B.prototype);
// Object.setPrototypeOf(A.prototype, B.prototype);