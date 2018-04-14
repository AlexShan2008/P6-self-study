// koa 洋葱模型 和redux原理很像；
// use 中间件，把中间件套在一起了；

// await next();
// 注意事项：只要有next()调用，就加一个await 防止下个next()调用异步方法；
// 也可以用return next()方法。前提是下面就没有返回值 

let Koa = require('koa');

let app = new Koa();
app.listen(3000);

// 1
// 3
// 5
// 6
// 4
// 2
// http 异步请求

function log(params) {
    return new Promise((reslove,reject)=>{
        setTimeout(() => {
            console.log('ok');
            reslove();
        }, 3000);
    })
}

app.use(async (ctx,next)=>{
    console.log(1);
    await next();
    console.log(2);
});
app.use(async (ctx, next) => {
    console.log(3);
    await log();
    await next();
    console.log(4);
});
app.use(async (ctx, next) => {
    console.log(5);
    await next();
    console.log(6);
});