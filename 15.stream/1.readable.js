let fs = require('fs');
let path = require('path');
let readable = require('./Readable');

let rs = fs.createReadStream(path.join(__dirname,'./1.txt'), {
// let rs = new readable(path.join(__dirname, './1.txt'), {
    flags: 'r',
    autoClose: true,
    encoding: 'utf8',
    start: 0,
    // end:6,
    highWaterMark: 3
});

// 默认会先读满缓存区的内容；
// 当缓存区为空时，会默认再去读取readable事件；
// 不满缓存区就再去读取；
rs.on('readable', function (err, data) {
    // 如果要读取的数量大于缓存区的n，
    let result = rs.read(2);//指定读取的长度；
    console.log(result);
})