// let Koa = require('koa');
let Koa = require('./koa/application');
let app = new Koa();

app.listen(3000);

// ctx 上下文环境 只是用来实现代理req res的
app.use((ctx, next) => {
    ctx.response.body = 'Hello';
    ctx.response.body = 'Hello2';
    console.log(ctx.response.body);
});

