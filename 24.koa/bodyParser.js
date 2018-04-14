module.exports = function bodyParser(req) {
    return async (ctx, next) => {
        await new Promise((resolve, reject) => {
            let buffers = [];
            ctx.req.on('data', function (data) {
                buffers.push(data);
            });
            ctx.req.on('end', function () {
                ctx.request.body = Buffer.concat(buffers)
                resolve()
            });
        });
        await next();
    }
}