// BOM 头的问题 .txt 
// GB2312 2个字节代表一个汉字
// .txt默认编码格式是GBK

let fs = require('fs');
let path = require("path");
let index = require('./index');

// 0xFEFF  ef bb bf（utf8BOM头）
// stripBOM
// utf8 是unicode的一种实现；用3个字节表示一个汉字
let res = fs.readFileSync(path.resolve(__dirname, './1.txt'), "utf8");
console.log(res.toString());

// 截图BOM头
// Buffer.isBuffer(content) 判断是否是buffer 

// 爬虫  淘宝 我的淘宝页面就是GBK编码 
// 分析页面结构；
// 判断文件的编码格式；根据编码类型来处理；
// node不支持GBK  
// 我们想GBK转行成utf8
// iconv-lite  




let fs = require('fs');
let path = require("path");
let iconv = require('iconv-lite');
let result = fs.readFileSync(path.resolve(__dirname, './2.txt'));

// result = iconv.incode(result, "gbk"); //指定编码格式；
result = iconv.decode(result, "gbk"); //指定源文件编码格式；
console.log(result.toString());

// Buffer的乱码的问题
// String_decoder
// 等待能够解析的buffer时候，才再解析；
let buffer = Buffer.from("珠峰培训");
let buf1 = buffer.slice(0,5);
let buf2 = buffer.slice(5);

let {StringDecoder } = require("string_decoder");
let sd = new StringDecoder();
console.log(sd.write(buf1).toString());
console.log(sd.write(buf2).toString());


// 一键UTF8格式进行编码；

// package.json
// scripts: 
// 创建一个快捷方式


// 全局安装第三方包
// npm link 会把文件夹连接到指定文件夹下面；把当前文件夹连接到全局目录下；
// 好处就是变开发变测试

// npm root -g 获取全局安装的目录
// #! /usr/bin/env node
// 先配置package.json 下的bin参数
// "bin":"bin/a.js"
// 然后命令行运行npm link 
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
// },
// "bin": {
//     "my-react": "bin/a.js"
// },