// {"失恋":[findBoy,eat,drink]} Node 

// [onfulfilled,onfulfilled]  resolve();
// [findBoy,eat,drink]  React 

// 发布订阅 就是一对多的模式
// 监听的目的就是为了构造对象，对象就是一对多的关系；
// 发布的时候 会让数字里的函数一次执行
// 订阅 on 发布 emit

// let EventEmitter = require("events");
let EventEmitter = require("./events");

let util = require("util");


function Girl(params) {
}
util.inherits(Girl, EventEmitter);// Girl.prototype.__proto__ = EventEmitter.prototype;
let girl = new Girl();

let drink = function (params) {
    console.log("drink");
}
let findBoy = function (params) {
    console.log("findBoy");
}
girl.on("newListener",function(eventName){
    console.log(eventName);
    
})

// girl.once("sl", drink);//{"l":drink}
girl.on("sl", findBoy);
// girl.removeListener("sl", findBoy);

girl.emit("sl",findBoy,drink);
girl.emit("sl");
girl.emit("sl");