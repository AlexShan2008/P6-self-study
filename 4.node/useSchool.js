let a = require('./school');

console.log(a);


// require 方法 传入一个文件的路径
// 会解析一个绝对路径
// 模块有缓存，如果有，直接取缓存的
// id 模块的标识
// 每个模块有一个exports对象

(function (exports,require,module) {
    module.exports= content;
})();

// runInThisContext 将这个