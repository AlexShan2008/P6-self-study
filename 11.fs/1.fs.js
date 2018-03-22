// fs file system  
// readFile  异步
// readFileAsync  同步 多个一个callback(err,data)

let fs = require("fs");
let path = require("path");
// // 同步性能低，会阻塞线程；能用异步不用同步；
// let res =fs.readFile(path.resolve(__dirname,"./1.txt"),{flag:"w"},function (err,result) {

// });

// 编码格式
// --rw-r--r-- 
// mode 权限分配最大7  文件所有者 4+2+1   文件所属组 
// r 读 4 rfd 描述符要对应上
// w 写 2 wfd
// x 执行 1
// 0o666 默认读写权限
// 0o444 默认读
// 二爷一直死读书  
// let str="";
// let res = fs.readFile(path.resolve(__dirname,"1.txt"),"utf8",function(err,data){
//     str = data;
// })
// fs.writeFile(path.resolve(__dirname, "./2.txt"), "Hello", { encoding: "utf8" }, { mode: 0o666 },function (err, data) {
//     console.log(err);
// });

// 此方法占内存；一次定读完和写完；不能使用；

// 限制读取个数；可以手动读取；
// fs.open 打开文件，再进行操作文件；
// fd file descritor
// process.stdo
let buffer = Buffer.alloc(3);

fs.open(path.join(__dirname, "1.txt"), "r", 0o666, function (err, fd) {
    console.log(fd);//3 1标准输出 2错误输出
    // offset 表示的是buffer从哪个开始存储；
    // length 3 一次读3个，不能大于buffer数量；代表想读的个数；
    // length不能大于Buffer的长度；
    // position 代表的是文件的读取位置，默认是null,默认是当前位置；
    fs.read(fd, buffer, 0, 3, 0, function (err, bytesRead) {
        // bytesRead 代表实际读取到的个数；取决于文件有多少个；
        // console.log(err);
        // console.log(buffer.toString());
    })
})

// w 清空后写入；
// a 追加内容，位置就不生效了
// 3 从第3个字节开始；
// 3 读3个字节；

fs.open(path.join(__dirname, "2.txt"), "r+", 0o666, function (err, fd) {
    fs.write(fd, Buffer.from("珠峰"), 0, 3, 3, function (err, byteWritten) {
        if (err) return;
        console.log(byteWritten);
    })
})

// 实现手动设置读取的长度；
// fs.read()
function copy(source, target) {
    let size = 3;
    let buffer = Buffer.alloc(3);
    fs.open(path.join(__dirname, source), "r", function (err, rfd) {
        fs.open(path.join(__dirname, target), "w", function (err, wfd) {
            function next() {
                fs.read(rfd, buffer, 0, size, null, function (err, bytesRead) {
                    if (bytesRead > 0) {
                        fs.write(wfd, buffer, 0, 3, null, function (err, byteWritten) {
                            next();
                        })
                    } else {
                        fs.close(rfd,function () {
                            fs.fsync(wfd,function(){
                                fs.close(wfd,function(){
                                    console.log("关闭,保存成功");
                                    
                                })
                            })
                        })
                    }

                })
            }
            next();
        })
    })
}
copy("1.txt", "2.txt");

// 文件打开是需要关闭的；
fs.open(path.join(__dirname, '1.txt'), 'w', function (err, fd) {
    console.log(fd);
    fs.write(fd, Buffer.from("珠峰"), 0, 6, 0, function (err, byteWritten) {
        // 当write方法触发了回调函数，并不是真正的文件被写入了；
        // 先把内容写到缓存区
        // 强制将缓存区的内容先写入，写入后再关闭文件；
        fs.fsync(fd, function (err, ) {
            fs.close(fd, function () {
                // console.log("关闭");
            });
        })
    })

})

// fs.fsync(fd, function 确保缓存区的内容写入；
setTimeout(function () {
    fs.open(path.join(__dirname, '2.txt'), 'r', function (err, fd) {
        console.log(fd);
    })
}, 1000)
