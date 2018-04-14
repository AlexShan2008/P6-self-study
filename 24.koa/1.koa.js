let Koa = require('koa');
let app = new Koa();

app.listen(3000);

// ctx 上下文环境 只是用来实现代理req res的
app.use((ctx,next)=>{
    ctx.body = 'Hello1';
    ctx.body = 'Hello2';
    ctx.body = 'Hello3';//只会打印最后一次；但是可以调用多次；
});

