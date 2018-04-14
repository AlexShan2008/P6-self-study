// 虚拟主机 同一个服务网器；一级域名，二级域名；n个域名，n个网站，监听同一个端口

const httpProxy = require('http-proxy');
const http = require('http');
let proxy = httpProxy.createProxyServer();

//实际项目中， 需要在服务器上进行配置域名解析；
let hosts = {
    'www.sg.cn': "http://localhost:8000",
    'www.son.sg.cn': "http://localhost:5000"
}

http.createServer(function (req, res) {

    let host = req.headers['host'];

    proxy.web(req, res, {
        target: hosts[host]
    })

}).listen(3000);

