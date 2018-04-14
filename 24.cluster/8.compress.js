const http = require('http');
const path = require('path');
const zlib = require('zlib');
const fs = require('fs');

// accept - encoding: gzip, deflate, br  client 

let server = http.createServer(function (req, res) {
    let p = path.join(__dirname, '1.txt');
    let header = req.headers['accept-encoding'];
    res.setHeader('Content-Type','text/html;charset=utf8')
    if (header) {
        if (header.match(/\bgip\b/)) {
            let gzip = zlib.createGzip();
            res.setHeader('Content-Encoding', 'gzip')
            fs.createReadStream(p).pipe(gzip).pipe(res);
        } else if (header.match(/\bdeflate\b/)) {
            let deflate = zlib.createDeflate();
            res.setHeader('Content-Encoding', 'deflate')
            fs.createReadStream(p).pipe(deflate).pipe(res);
        } else {
            fs.createReadStream(p).pipe(res);
        }
    } else {
        fs.createReadStream(p).pipe(res);
    }

}).listen(3000);