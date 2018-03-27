let fs = require('fs');
let path = require('path');

let rs = fs.createReadStream(path.join(__dirname, '1.txt'), {
    highWaterMark: 3
});
// 如果当前缓存区被清空后再次触发readable事件；
rs.on('readable', function () {
    console.log(rs._readableState.length);
    let result = rs.read();
})