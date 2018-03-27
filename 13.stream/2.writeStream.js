let fs = require('fs');
let ws = fs.createWriteStream('./1.txt', {
    flags: 'w',
    mode: '0o666',//读写权限
    autoClose: true,
    highWaterMark: 3,//默认写16kb
    encoding: 'utf8',
    start: 0
})

// write end
// 写入的数据必须是字符串或者buffer
// 先写到缓存区中，
// flag代表是否能继续写；返回false也不会丢失数据，只是会把内容放到内存中；
let flag = ws.write("1", "utf8", () => {

});//异步的方法；

console.log(flag);
ws.write("1", "utf8", () => {

});//异步的方法；
console.log(flag);


// 当所有数据都写完以后；会触发
// 必须缓存区满了，满了以后被清空才会触发此方法；
// 用来判断缓存区是否被占满；
// 可读流配合可写流，写pipe方法；管道；
ws.on('drain', () => {
    console.log('drain');

});
ws.end('ok');//当写完以后，就不能再继续写了；
