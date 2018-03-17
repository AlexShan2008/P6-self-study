let res = require('./p');
console.log(res);
// 直接引入的是文件
// 多个模块依赖的时候，包的表示方法就是有个package.json
// 如果这个文件夹中么有package.json,那么就在当前目录下找index.js index.json

// 第三方模块的查找路径；
// 第三方部门不能加./
// module.paths
let pp = module.paths;
console.log(pp);

// module和module.exports 
// module里存放exports对象； exports === module.exports
