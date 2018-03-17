// commonjs规范，每个文件都是一个模块；
// 两个模块相互独立，使用的runinThisContext方法;
// 一个模块外面家里一个闭包；
// 导出模块； module.exports = Shool;
// 模块是一个对象；


let Shool = {
    name: "zfpx"
}

module.exports = Shool;


/* 
(function (exports, require, module, __dirname,__filename) {

let Shool = {
    name: "zfpx"
}

module.exports = Shool;

})({},req,{filename,exports:{}}); */