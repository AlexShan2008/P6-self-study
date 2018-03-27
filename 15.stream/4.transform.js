// 双工流，既能读又能写；
// 读写可以没有关系；
const { Duplex } = require('stream');

let { Transform } =require('stream');

let transform1 = Transform({
    transform(chunk,encoding,callback){
        console.log(chunk);
        this.push(chunk.toString().toUpperCase());//将输入的内容放到可读流中；
        callback();
    }

});

// 等待输入；
// rs.pipe(ws);
// process.stdin.pipe(transform1);



// 将输入的内容转换成大写，再输出处理；
let transform2 = Transform({
    transform(chunk, encoding, callback) {
        console.log(chunk);
        callback();
    }

});
// 转换流；
process.stdin.pipe(transform1).pipe(transform2);
