let fs = require('fs');
let path = require('path');
let ReadStream = require('./2.ReadStream');
let WriteStream = require('./WriteStream');

let rs = new ReadStream(path.join(__dirname,'./1.txt'), {
    highWaterMark: 4
});

let ws = new WriteStream(path.join(__dirname, './2.txt'), {
    highWaterMark: 1
});


// 用pipe读取

// let ws = fs.createWriteStream(path.join(__dirname,'./2.txt'), {
//     highWaterMark: 1
// });

// let rs = fs.createWriteStream(path.join(__dirname, './1.txt'), {
//     highWaterMark: 4
// });

rs.pipe(ws);


// rs.on('data',function(chunk){
//     // chunk读到的内容；
//     let flag = ws.write(chunk);
//     console.log(flag);
//     if(!flag){
//         rs.pause();
//     }
    
// });

// ws.on('drain',function(){
//     console.log('drain');
    
//     rs.resume();
// });
