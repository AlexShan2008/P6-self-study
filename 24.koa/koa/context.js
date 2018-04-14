import { INSPECT_MAX_BYTES } from "buffer";

// context 代理request和response属性；

const proto = {

}
function delateGetter(property, name) {
    proto.__defineGetter__(name, function () {
        return this[property][name];
    });


}
function delateSetter(property, name) {
    proto.__defineSetter__(name, function (val) {
        this[property][name] = val;
    })

}
// proto === ctx 
// proto.query = request.query
// ctx.query = ctx.request.query
// 让proto代理request上的query属性；

// proto.query = {
//     get() {
//         return ctx.request.query;
//     }
// }


delateGetter('request', 'query');
delateGetter('request', 'method');
delateGetter('response', 'body');
delateSetter('response', 'body');
module.exports = proto;