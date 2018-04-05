const http = require('http');

// Node爬虫

let options = {
    hostname:'localhost',
    port:8080,
    path:'/',
    method:'get',
    // 告诉服务我要给你发什么样的数据
    // 必须写长度
    headers:{
        'Content-Type':'application/json',
        // 'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':15
    }
}
let req = http.request(options);
let data ={

}
// 常用格式
// 前后端通信靠json字符串；
req.end('{"name":"zfpx"}');
// req.end('{"name=zfpx&&age=9"}');
console.log(req);
