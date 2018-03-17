let fs = require("fs");
let path = require("path");
let EventEmitter = require("events");
let events = new EventEmitter();
let arr = [];

// 同时读取几个文件；
// events 发布 订阅模式

events.on("getData",function (data) {//绑定功能；
    arr.push(data);
    console.log(data);
    
    if(arr.length === 2){
        console.log(arr);
    }
    
})

fs.readFile(path.resolve(__dirname, "1.txt"), "utf8", function (err,data) {
    events.emit("getData",data);
});
fs.readFile(path.resolve(__dirname, "2.txt"), "utf8", function (err,data) {
    events.emit("getData",data);
});

