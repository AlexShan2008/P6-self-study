// 流 node里很多内容都应用到了流；
// 流的特定有序，有方向的；
// 可读流，可写流
// 对文件操作用的也是fs模块；

let fs = require('fs');
let path = require('path');
// socket req 返回可读流对象；
let rs = fs.createReadStream(path.join(__dirname, "1.txt"), {
    flags: 'r',//对文件读取
    encoding: 'utf8',//默认是Null 是Buffer
    autoClose: true,//读取完毕后自动关闭
    highWaterMark: 3,//默认是64kb 64x1024字节
    start: 0,//从0开始读 包前又包后
    end: 9 //包括9 
})

// 默认情况下不会将文件的内容输出;
// 内部会先创建一个buffer先读取3byte，每次读3个字节

// 非流动模式，暂停模式
// 需要监听事件才能出发;
// 监听事件触发流动模式；直到读取完毕为止；
rs.setEncoding('utf8'); //和上面在参数中设置相同encoding: 'utf8'
rs.on('open', function () {
    console.log('open');
})
rs.on('data', function (data) {
    console.log(data);
    rs.pause();//暂停方法；暂停事件触发；
});
setTimeout(() => {
    rs.resume();//恢复data事件的触发，
}, 3000);
// 设定自动继续；
setInterval(() => {
    rs.resume();//恢复data事件的触发，
}, 3000);
// 读完时触发end事件；
rs.on('end',function(){
    console.log('end');
});
rs.on('close', function () {
    console.log('close');
});
rs.on('error', function (error) {
    console.log(error);
})