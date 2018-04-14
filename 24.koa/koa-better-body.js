let Koa = require('koa');
let app = new Koa();
let path = require('path');
// 截取Buffer的方法；
Buffer.prototype.split = function (sep) {
    let pos = 0;
    let len = Buffer.from(sep).length;
    let index = -1;
    let arr = [];
    while (-1 != (index = this.indexOf(sep, pos))) {
        arr.push(this.slice(pos, index));
        pos = index + len;
    }
    arr.push(this.slice(pos));
    return arr;
}
function bodyParser(options = {}) {
    let { uploadDir } = options;
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let buffers = [];
            ctx.req.on('data', function (data) {
                buffers.push(data);
            });
            ctx.req.on('end', function () {
                let type = ctx.get('content-type');
                let buff = Buffer.concat(buffers);
                let fields = {}
                if (type.includes('multipart/form-data')) {
                    // 多form-data格式
                    let sep = '--' + type.split('=')[1];
                    let lines = buff.split(sep).slice(1, -1);
                    lines.forEach(line => {
                        let [head, content] = line.split('\r\n\r\n');
                        head = head.slice(2).toString();
                        content = content.slice(0, -2);//去掉第一项和最后1项；
                        
                        let [, name] = head.match(/name="(.*)"/);

                        if (head.includes('filename')) {
                            // 处理文件
                            let c = line.slice(head.length + 6);
                            let p = path.join(uploadDir, Math.random() + toString());
                            require('fs').writeFileSync(p, c);
                            fields[name] = [{ path: p }];

                        } else {
                            fields[name] = content.toString();
                        }
                    })
                }
                ctx.request.fields = fields
                resolve();
            });
        });
        await next();
    }
}
app.use(bodyParser({
    uploadDir: path.join(__dirname, 'koa')
}));
app.listen(3000);
app.use(async (ctx, next) => {
    if (ctx.path === '/user' && ctx.method === 'GET') {
        ctx.body = (`
            <form method="post" enctype="multipart/form-data">
                <input type="text" name="username">
                <input type="text" name="password">
                <input type="file" name="avatar">
                <input type="submit">
            </form>
        `)
    } else {
        return next();
    }
});
app.use(async (ctx, next) => {
    if (ctx.path === '/user' && ctx.method === 'POST') {
        ctx.set('Content-Type', 'text/html;charset=utf8');
        ctx.body = ctx.request.fields;
    }
});


