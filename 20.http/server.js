const http = require('http');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
let stat = promisify(fs.stat);

// Range:bytes=0-10
http.createServer(async (req, res) => {
    let p = path.join(__dirname, 'content.txt');
    let statObj = await stat(p);
    let start = 0;
    let end = statObj.size - 1;// 读流是左闭右闭
    let total = end;
    let range = req.headers['range'];
    if (range) {
        res.setHeader('Accept-Ranges', 'bytes');
        //  ['匹配的字符串',['第一个分组']]
        let result = range.match(/bytes=(\d*)-(\d*)/);
        start = result[1] ? parseInt(result[1]) : start;
        end = result[2] ? parseInt(result[2])-1: end;
        res.setHeader('Content-Range', `${start}-${end+1}/${total}`);
    }
    res.setHeader('Content-Type', 'text/plain;charset=utf8')
    fs.createReadStream(p, start, ).pipe(res);//将读的文件直接发送客户端

}).listen(3000);