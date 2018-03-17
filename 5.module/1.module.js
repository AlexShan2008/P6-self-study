// 模块分为两大类
// 1. 内置模块（核心模块）
// 引用内置模块，直接写模块名，直接引用，不需要安装和下载。如：  let path = require('fs');

// 2. 第三方模块
// 3. 文件模块；（自定义）这个就是我们自己写的模块。


// fs 新增，端口文件是否存在；fs.accessSync
// 
let fs = require('fs');//readFile readFileAsync
let flag = fs.accessSync('./5.module/1.txt'); //no such file or directory
// 文件找到就不会发生任何异常

// 1.path
// 解决路径的问题
let path = require('path');
let p = path.resolve('1.txt') //传入相对路径或文件名，按当前路径，解析出绝对路径；
console.log(p); //c:\Users\ShanGuo\Workspace\P6-self-study\1.txt
// __dirname 当前文件所在文件夹的路径，（不可更改），和cwd有区别（可更改）
let p1 = path.resolve(__dirname, "1.txt");//解析绝对路径 c:\Users\ShanGuo\Workspace\P6-self-study\5.module\1.txt
let p2 = path.join(__dirname, "1.txt");//解析绝对路径 c:\Users\ShanGuo\Workspace\P6-self-study\5.module\1.txt


let p3 = path.join("b", "1.txt");
console.log(p1); //c:\Users\ShanGuo\Workspace\P6-self-study\5.module\1.txt
console.log(p3); //b\1.txt

let b = path.basename("1.txt");
console.log(b);//1.txt
let b1 = path.basename("1.txt", ".txt");
console.log(b1);//1

let e = path.extname("a.js");
let e1 = path.extname("a.min.js");
console.log(e);//.js
console.log(e1);//.js

path.delimiter; //判断环境变量；windows是；Linux Mac是：

// windows 路径都是: \  
// Linux Mac是：/
path.sep
path.posix.sep  // linux

// vm  虚拟机 模块 runinThisContext 
let vm = require("vm"); //eval是依赖于环境的；会收外界环境影响；

let a = 1;
eval("console.log(a)"); //1

vm.runInThisContext("console.log(a)"); // a is not defined。不依赖外部环境；
vm.runInThisContext("console.log(${a})"); // a。先打印，在运行外部环境；

