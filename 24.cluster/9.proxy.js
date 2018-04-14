// 正向代理：类似一个跳板机；自己设置，一定知道；
// 1.翻墙；
// 2.缓存；直接从代理服务器获取资源；
// 3.权限；内部服务器进行验证；

// 反向代理：一般服务端设置代理；例如ngnix；不知道是否有代理；webpack

// proxy

// 正向代理，一般都是客户端设置的；

// http-proxy
const httpProxy = require('http-proxy');
const http = require('http');
let proxy = httpProxy.createProxyServer();

http.createServer(function(req,res){
    proxy.web(req,res,{
        target:'http://localhost:8000'
    })

}).listen(3000);



