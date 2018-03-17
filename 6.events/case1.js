let EventEmitter = require("events");
let util = require("util");

function Girl(params) {

}

util.inherits(Girl, EventEmitter);

let girl = new Girl();

// 用on绑定的方法  用emit触发
girl.on("newListener", function (eventName, callback) {
    console.log(eventName, callback);

})
function findNewBoy() {
    console.log("find new boy");

}
girl.on("失恋", findNewBoy);

girl.once("失恋", findNewBoy);//触发新事件；只触发一次，触发后不再触发；
girl.removeListener("失恋", findNewBoy);

// EventEmitter.defaultMaxListeners // 默认能绑定10个方法，超过会包内存泄露
girl.setMaxListeners(3);
girl.getMaxListeners(3);
girl.emit("失恋");//触发新事件；
girl.emit("失恋");//触发新事件；
girl.emit("失恋");//触发新事件；
