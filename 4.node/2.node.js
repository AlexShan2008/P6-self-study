// node调试

// 命令行调试 增加一个inspect参数
// cmd:  node  node.js 正常走
// cmd:  node inspect node.js >debugger  n 下一步 c 调下一个断点  repl ->  s 跳进去 o 跳出来
// watch a ; watchers

function sum(a, b) {
    return a + b;
}
var a = 1;
var b = 2;
debugger;
console.log(sum(a, b));


// 浏览器调试
// 可以将Node代码当成浏览器调试；
// node --inspect-brk filename
function sum(a, b) {
    return a + b;
}
var a = 1;
var b = 2;
debugger;
console.log(sum(a, b));


// 编辑器调试

