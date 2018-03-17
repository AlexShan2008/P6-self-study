// 一般情况打印出来都是10进制

// 二进制 0b11 3

// 八进制 0o17 15

// 十六进制 0x1f 31  0-9 a10 b11 c12 d13 e14 f15 

// 一个字节有多少位 1bit = 8byte
// 一个字节最多表示255 

parseInt("1111111",2);
(255).toString(2); //转换成2进制 
(255).toString(16); //转换成16进制  ff

// 计算机编码
// ASCII  美国信息互换标准码
// 前32内置 
// 空格、数字、大小写字母  0-127  

// GB2312 128-255 扩展字符集7998个简体汉字
// 用两个字节表示1个汉字
// 127 0xF7 127以下是半角表示，大于次数用全角表示；

// GBK 常用2万+汉字  65535  256*256-1 

// GB18130 /DBCS

// Unicode ISO规范 可以容纳100万个符号
// 所有汉字都用两个字节表示，16位

// UTF-8 为了解决传输较大的问题  用3个字节表示汉字，但是也是16位存，其它的位作为标志；
// 每次以8个位传输数据
// 变长
// 0x10ffff 
// 110开头 <127
// 1110开头 <127
// 0开头 <127


// 把unicode转成utf8怎么转？
// 73E0 代表 珠  unicode中
// 1110xxxx 110xxxxx 10xxxxxx

// 73E0 代表 珠  unicode中
console.log(0x73E0);
console.log(0x73E0.toString(2));
// 1110 0111 1000 1111 1010 0000 UTF-8 二进制

// 16进制 
console.log(0b11100111.toString(16));//e7
console.log(0b10001111.toString(16));//8f
console.log(0b10100000.toString(16));//a0

let a = Buffer.from("珠","utf-8");
console.log(a);//e7 8f a0

// unicode转成UTF-8编码格式
function transfer(code) {
    let arrs = ['1110','10','10'];
    let c = code.toString(2);
    console.log(c);
    arrs[2] =arrs[2]+c.slice(c.length-6);
    arrs[1] = arrs[1] + c.slice(c.length - 12, c.length - 6);
    arrs[0] = arrs[0] + c.slice(0,c.length - 12).padStart(4,0);//不足4位用0补位；
    arrs.map(item => parseInt(item,2).toString(16));
    return arrs;
}
let res = transfer(0x59dc);//用来转换utf-8
console.log("res",res);

// ANSI windows下就GB2312编码 .txt存储默认存为GB2312;
// 但是，再次打开.txt文件会根据二进制码选择编码格式进行打开；
