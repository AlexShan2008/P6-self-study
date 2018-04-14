import { AssertionError } from 'assert';

let Koa = require('koa');
let path = require('path');
let fs = require('fs');
let util = require('util');
let stat = util.promisify(fs.stat);
let app = new Koa();

// koa-static 
function static() {
    return async (ctx, next) => {
        try {
            p = path.join(p, ctx.path);
            
            let statObj = await stat(p);
            if (statObj.isDirectory()) {

            } else {
                ctx.body = fs.createReadStream(p);
            }

        } catch (e) {

        }
    }
}

let static = require('koa-static');
app.use(static(path.join(__dirname, 'public')));
app.use(async (ctx, next) => {
    ctx.body = 'not found';
})

app.listen(8000);