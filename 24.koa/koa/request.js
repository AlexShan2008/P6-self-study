// koa自己封装的一个对象
let url = require('url');

// request.req = req;
const request = {

    get query() {
        return url.parse(this.req.url, true).query;
    },
    set method(val) {
        this.req.method
    }
}

module.exports = request;