let Koa = require('koa');
let app = new Koa();
let path = require('path');

let bodyParser = require('koa-better-body');

function bodyParser(options) {
    let {uploadDir} = options;
    return async (ctx,next)=>{
        await new Promise((resolve, reject) => {
            let buffers = [];
            ctx.req.on('data', function (data) {
                buffers.push(data);
            });
            ctx.req.on('end', function () {
                ctx.request.body = Buffer.concat(buffers);
                let type = ctx.get('content-type');
                if(type.includes('multipart/form-data')){
                    let sep = '--'+type.split('=')[1];
                }
                resolve()
            });
        });
        await next();
    }
}

app.use(bodyParser({
    uploadDir:path.join(__dirname,'koa')
}));


app.listen(3000);
app.use(async (ctx, next) => {
    if (ctx.path === '/user' && ctx.method === 'GET') {
        ctx.body = (
            `
            <form method='post' enctype='multipart/form-data' multiple>
            <input type='text' name='username'>
            <input type='text' name='password'>
            <input type='file' name='avator'>
            <input type='submit'>
            </form>
            `
        )
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    if(ctx.path === '/user' && ctx.method === 'POST'){
        ctx.set('Content-Type','text/html;charset=utf8')
        ctx.body = ctx.request.files; 
    }
})