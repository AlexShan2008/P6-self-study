let fs = require('fs');
let path = require('path');

// 创建文件夹；必须保证父级存在才能创建；
// fs.mkdir('a', function (err, data) {
//     console.log(err);

// })

// 同步；
// fs.mkdirSync('a');

// 按顺序创建文件目录 mkdir -p a/b/c Linux命令
// 同步创建；性能低；
function makep(dir) {
    let paths = dir.split('/');
    for (let i = 1; i < paths.length; i++) {
        let newPath = paths.slice(0, i).join('/'); // a b 
        // 先判断目录是否存在；
        try {
            fs.sccessSync(newPath, fs.constants.R_OK); //存在不创建  R_OK 能读到  F_OK能找到 W_OK权限写
        } catch (e) {
            fs.mkdirSync(newPath);
            console.log(e);

        }
    }

}
// makep("a/b/c/d/e"); // 分开截取


// 异步不能用for循环

function mkdirSync(dir, callback) {
    let paths = dir.split("/");
    let index = 1;
    function next(index) {
        if (index > paths.length) {
            return callback;
        }
        let newPath = paths.slice(0, index).join('/');
        fs.access(newPath, function (err) {
            if (err) {
                fs.mkdir(newPath, function (err) {
                    // 创建后创建下一个文件夹；
                    next(index + 1);
                });
            } else {
                // 即时存在，继续创建下一个文件夹；
                next(index + 1);
            }
        })

    }
    next(index);
}

// mkdirSync("w/q/m",function(err){

// });


// 如何判断是文件夹还是文件？只能判断一级;
// fs.statAsync()
// stat包含了子文件夹的特征参数；
// fs.stat("a", function (err, stat) {
//     // 读取当前文件夹下的内容；
//     // stat.isFile()是文件；
//     if (stat.isDirectory()) {
//         // 是文件夹;
//         fs.readdir("a", function (err, files) {
//             // console.log(files); //['b]

//         })
//     }

// })
// 删除文件夹；从最内侧的文件夹开始删除；

// // 同步
// fs.rmdirSync("a");


// // 异步
// fs.rmdir("a");


// // 删除文件；
// fs.unlink("a", function (err) { });
// fs.unlinkSync("a");

// 删除整个文件夹；同步删除；
// function rmoveDir(dir) {
//     let files = fs.readdirSync(dir);//获取下一级文件的内容；
//     for (let i = 0; i < files.length; i++) {
//         let newPath = path.join(dir, files[i]);
//         let stat = fs.statSync(newPath);
//         if (stat.isDirectory()) {
//             // 文件夹;如果是文件夹就递归；
//             rmoveDir(newPath);

//         } else {
//             // 文件
//             fs.unlinkSync(newPath);
//         }
//         console.log(files[i])
//     }
//     fs.rmdirSync(dir);//如果文件夹是空的就删除自己；
// }
// rmoveDir('a');


// 异步删除文件夹；借助Promise
function rmDirAsyncPromise(dir) {
    return new Promise(function (resolve, reject) {
        fs.stat(dir, function (err, stat) {
            if (stat.isDirectory()) {
                // 等下一级的文件都删除后删除父级文件;
                fs.readdir(dir, function (err, files) {
                    // 把files转成promise
                    files = files.map(file => {
                        return path.join(dir, file); //a/b a/e
                    })
                    files = files.map(file => {
                        return rmDirAsyncPromise(file);
                    })
                    Promise.all(files).then(function () {
                        fs.rmdir(dir, resolve);
                    })
                })
            } else {
                // 删除文件直接变成成功态；
                fs.unlink(dir, resolve);
            }

        })

    })

}
// rmDirAsyncPromise("a").then(function () {

// });


// 顺序分类  先序  后序  顺序 中序
// 二叉树先序 深度遍历  a  a/b  a/b/c  a/b/d  删除c d 然后删除b 
// function rmdirAsync(dir, callback) {
//     console.log(dir);
//     fs.readdir(dir, function (err, files) {
//         // 读取文件夹；
//         function next(index) {
//             if (index === files.length) {
//                 // 是空文件的时候，删除文件；
//                 return fs.rmdir(dir, callback);
//             }
//             let newPath = path.join(dir, files[index]);
//             fs.stat(newPath, function (err, stat) {
//                 if (stat.isDirectory()) {
//                     // 要读取的是b里的第一个 而不是去读c
//                     // 如果b里的内容没有了，应该去遍历c
//                     rmdirAsync(newPath, () => next(index + 1));
//                 } else {
//                     // 删除文件；
//                     fs.unlink(newPath, () => {
//                         return next(index + 1);
//                     })
//                 }
//             })
//         }
//         next(0);
//     })

// }


// rmdirAsync("a", function () {
//     console.log("删除成功！");
// });

// gulp 中使用；
fs.watchFile("./1.txt", function (current, prev) {
    if (Date.parse(current.ctime) === 0) {
        console.log("删除");
    } else if (Date.parse(prev.ctime) === 0) {
        console.log("创建");
    } else {
        console.log("修改");
    }
})

// fs.rename 文件或者文件夹改名字
// fs.rename("a","b");//把a重命名为b

// fs.truncate("1.txt",5);//截断长度为5；


// 广度遍历；先遍历a 然后b c  然后 d m
function preWide(dir){
    let arrs = [dir]; // 存放目录结构的数组
    let index = 0; // 指针
    let current;
    while(current = arrs[index++]){ // current可能是文件
        let stat = fs.statSync(current);
        if(stat.isDirectory()){
            let files = fs.readdirSync(current); // [b,c]
            // [a,a/b,a/c,a/b/d,a/b/e,a/c/m];
            arrs = [...arrs,...files.map(file=>{
                return path.join(current,file)
            })];
        }
    }
    for(var i = arrs.length-1 ;i>=0;i--){
        let stat = fs.statSync(arrs[i]);
        if(stat.isDirectory()){
            fs.rmdirSync(arrs[i]);
        }else{
            fs.unlinkSync(arrs[i]);
        }
    }
}
preWide("a");


// 异步广度遍历；
function preWideAsync(dir){
    let arrs = [dir];
    let index = 0;
    function next(index) {
        
    }
    next(0);
    

}
// preWideAsync("a");