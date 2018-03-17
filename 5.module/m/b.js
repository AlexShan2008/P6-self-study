exports = 1;
module.exports = 2;
exports.a = 3;//在exports对象上增量了一个属性；

//一个模块只能到处一个对象；

/* 
(function (exports, require, module, __dirname,__filename) {

this.module = module;
module.exports = Shool;

})({},req,{filename,exports:{}}); */