// let School = require('./school'); 
// //js json或者node文件可以省略文件后缀；
// // 读取文件顺序，.js .json .node文件；
// // 同步执行代码，读取后才会赋值；
// // 为了节约性能，还有缓存功能；将module.exports有缓存功能，有缓存不读取；

// console.log(School);

let fs = require("fs");
let path = require("path");
let vm = require("vm");
function Module(filename) {
    // 构造函数；
    this.filename = filename;
    this.loaded = true;
    this.exports = {
        // 模块是对象，导出一个对象；
    }
}
Module._extentions = [".js", ".json", ".node"];//如果没有后缀，就加文件后缀；
Module._cache = {};//缓存对象；

Module._resolvePathname = function (filename) {
    let p = path.resolve(__dirname, filename);
    if (!path.extname(p)) {
        // 如果没有文件后缀；
        for (let i = 0; i < Module._extentions.length; i++) {
            let newPath = p + Module._extentions[i];
            try {
                // 如果文件不存在，就抛出错误；继续查找；
                fs.accessSync(newPath);
                return newPath;
            } catch (e) {

            }
        }
    }
    return p;
}
Module.wrapper = [
    "(function (exports, require, module, __dirname,__filename) {",
    "\n})"
]
Module.wrap = function (script) {
    return Module.wrapper[0] + script + Module.wrapper[1];
}
Module._extentions["js"] = function (module) {
    let script = fs.readFileSync(module.filename);
    let fnStr = Module.wrap(script);
    // 改变this为module.exports；
    // module.exports指{}
    // req 请求方法；
    // module 模块；
    vm.runInThisContext(fnStr).call(module.exports, module.exports, req, module)
}

Module._extentions["json"] = function (module) {
    // try catch 
    try {
        let script = fs.readFileSync(module.filename);
        module.exports = JSON.parse(script);
    } catch (e) {

    }

}
Module._extentions["node"] = function (module) {

}

Module.prototype.load = function (filename) {
    // 加载模块；
    // 模块可能是js或者json;
    // 需要判断文件类型；
    let ext = path.extname(filename).slice(1); //.js .json
    Module._extentions[ext](this); //this指当前实例；   
}

// 自定义模块加载方法；
function req(filename) {
    // filename可以能没有后缀；
    // 需要找到文件的绝对路径；缓存是根据绝对路径来的；
    // a 1.js  b 1.js
    // 加载的是模块；
    filename = Module._resolvePathname(filename);
    // 先看缓存中是否存在；
    let cacheModule = Module._cache[filename];
    if (cacheModule) {
        // 缓存里有，直接返回exports属性；
        return cacheModule.exports;
    }
    //没缓存，加载模块；
    let module = new Module(filename);//创建模块；
    module.load(filename);
    Module._cache[filename] = module;
    this.loaded = true;//当前模块加载完；
    return module.exports;
}

let res = req("./school");
console.log(res);
