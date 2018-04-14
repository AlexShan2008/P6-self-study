const http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');

class Koa {
    constructor() {
        this.callbackFn;
        this.context = context;
        this.request = request;
        this.response = response;
    }
    createContext(req,res) {
        // 创建上下文
        let ctx = Object.create(this.context);//ctx.__proto__ = this.context; 防止改变context对象；
        // 创建请求对象；
        ctx.request = Object.create(this.request);
        ctx.response = Object.create(this.response);
        ctx.req = ctx.request.req = req; //ctx.request.query  这样就能调用了此方法；
        ctx.res = ctx.response.res = res; //ctx.request.query  这样就能调用了此方法；
        return ctx;
    }
    handleRequest() {
        return (req, res) => {
            // 创建上下文对象；
            let ctx = this.createContext(req, res);
            Promise.resolve(this.callbackFn(ctx)).then(function(){
                // 防止异步；
                res.end(ctx.body);
            });
        }
    }
    listen() {
        let server = http.createServer(this.handleRequest());
        server.listen(...arguments);
    }
    use(func) {
        this.callbackFn = func;

    }
}

module.exports = Koa;