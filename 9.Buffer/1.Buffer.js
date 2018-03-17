// Buffer 是一个表示固定内存分配的全局对象；对二进制数据的操作；
// 是Global的属性
// 申请内存 可以存放图片 文本等
//Buffer是十六进制的数字；
// Buffer里存的都是内存地址，是引用类型，浅拷贝；

let buffer = Buffer.alloc(6);//这种申请方式，内存永远都是干净的，安全的；会先清空内存，耗时
console.log(buffer);//<Buffer 00 00 00 00 00 00> 6个字节


let buffer2 = Buffer.allocUnsafe(6);//这种申请方式，内存永远都是干净的，安全的；会先清空内存，耗时
buffer2.fill(1, 3, 5);//<Buffer ff ff ff 01 01 00> 6个字节 从0开始，填到5，用3去填充
console.log(buffer2);

// 1.通过长度申请；
// 2.通过字符串申请；
console.log(Buffer.from("单通", "utf8"));//不支持GBK 

//  3.通过数组构建Buffer
let arr = Buffer.from([10, 11, 12, 13]);
console.log(arr);

// 把buffer和字符串进行转换；
let buffer = Buffer.alloc(12);
let buffer1 = "珠";
let buffer2 = "峰培训";
buffer.write(buffer1, 0, 3, "utf8");// 写入的内容 偏移量0 长度 一个汉字3个字符,所以
buffer.write(buffer2, 3, 9, "utf8");// 写入的内容 偏移量3 长度9 一个汉字3个字符,所以
console.log(buffer);//<Buffer e7 8f a0 e5 b3 b0 e5 9f b9 e8 ae ad>
console.log(buffer.toString()); //珠峰培训

// slice indexOf copy concat split 
let arr = [1, [2], 3, 4, 5];
let newArr = arr.slice(1, 2);// [2]
newArr[0][0] = 6;
console.log(arr); //[ 1, [ 6 ], 3, 4, 5 ]

// 1.slice
let buffer = Buffer.alloc(6, 1);
let newBuffer = buffer.slice(0, 3);
newBuffer[0] = 100;
console.log(buffer); //<Buffer 64 01 01 01 01 01>

// 2.copy
let buf = Buffer.alloc(6);
let buf1 = Buffer.from("单");
let buf2 = Buffer.from("通");

// targetBuffer offset sourceStart sourceEnd 
buf1.copy(buffer, 3, 0, 3);
buf2.copy(buffer, 0, 0, 3);


// 手写实现；
let buffer = Buffer.alloc(6);
let buf1 = Buffer.from("单");
let buf2 = Buffer.from("通");
Buffer.prototype.myCopy = function (targetBuffer, offset, sourceStart, sourceEnd) {
    for (let i = sourceStart; i < sourceEnd; i++) {
        targetBuffer[offset++] = this[i];
    }
}
buf1.myCopy(buffer, 3, 0, 3);
buf2.myCopy(buffer, 0, 0, 3);
console.log(buffer.toString());


// concat 返回新Buffer
let buffer = Buffer.alloc(6);
let buf1 = Buffer.from("单");
let buf2 = Buffer.from("通");
// 多写的内容就是0；
console.log(Buffer.concat([buf1, buf2], 1000));



// http tcp 请求时分段获取到数据；
Buffer.prototype.myConcat = function (list, totalLength) {
    // 如果未传长度时，就自动结算长度；
    if (typeof totalLength === "undefined") {
        list.reduce((prev, next) => {
            return prev + next.length;
        }, 0)
    }
    // 如果只传入了一个Buffer时候；
    if (list.length === 1) {
        return list[0];
    }
    let buf = Buffer.alloc(totalLength);
    let pos = 0;
    list.forEach((buffer, index) => { //[[1,2,3],[4,5,6]]
        for (var i = 0; i < buffer.length; i++) {
            buf[pos++] = buffer[i];
        }

    });
    return buf;
}
let buffer = Buffer.alloc(6);
let buf1 = Buffer.from("单");
let buf2 = Buffer.from("通");

// 多写的内容就是0；
console.log(Buffer.concat([buf1, buf2]));
// console.log(Buffer.concat([buf1, buf2], 1000));


// indexOf 判断是否包含某个元素
let buffer = Buffer.from("单--北极光--通");
// console.log(buf1.indexOf('--'), 0); //3 取的是Buffer的长度；第二个参数8代表从8开始查找
// split 分割方法
Buffer.prototype.split = function (sep) {
    let arr = [];
    let len = Buffer.from(sep, "utf8").length;
    let pos = 0;
    while (index = this.indexOf(sep, pos) != -1) {
        pos = index + len;
        arr.push(this.slice(pos, index));
    }
    arr.push(this.slice(pos));
    return arr;
}
let res = buffer.split("--");
console.log(res);

