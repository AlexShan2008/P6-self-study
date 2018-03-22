let ReadStream = require('./2.ReadStream');

let fs = require('fs');
let path = require('path');
let rs = fs.ReadStream(path.join(__dirname, "1.txt"), {
    flags: 'r',//对文件读取
    encoding: 'utf8',//默认是Null 是Buffer
    autoClose: true,//读取完毕后自动关闭
    highWaterMark: 3,//默认是64kb 64x1024字节
    start: 0,//从0开始读 包前又包后
    end: 9 //包括9 
})

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
// setInterval(() => {
//     rs.resume();//恢复data事件的触发，
// }, 3000);
// 读完时触发end事件；
rs.on('end', function () {
    console.log('end');
});
rs.on('close', function () {
    console.log('close');
});
rs.on('error', function (error) {
    console.log(error);
})