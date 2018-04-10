const {spawn} = require('child_process');
const path = require('path');

// 创建3个进程，互相传递参数；

let child1 = spawn('node',['1.test.js','a','b'],{
    cwd:path.join(__dirname,'pro')
});
let child2 = spawn('node', ['2.test.js', 'a', 'b'], {
    cwd: path.join(__dirname, 'pro')
});

child1.stdout.on('data',function(data){
    child2.stdout.write(data);
})