let options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
};

const http = require('http');
const fs = require('fs');
const path = require('path');
let ws = fs.createWriteStream(path.join(__dirname, 'download.txt'))
let pause = false;
let start = 0;
// 每次获取10个bytes
// Range:bytes=0-10
process.stdin.on('data', function (chunk) {
    // 监听标准输入
    chunk = chunk.toString();
    if (chunk.includes('p')) {
        // 暂停下载
        pause = true;
    } else if (chunk.includes('r')) {
        // 恢复下载
        pause = false;
        download();
    }
})

function download(params) {
    options.headers = {
        Range: `bytes=${start}-${start + 10}`
    }

    start += 10;
    // 发请求；
    start += 10;
    // 发请求
    http.get(options, function (res) {
        let range = res.headers['content-range'];
        let total = range.split('/')[1];
        let buffers = [];
        res.on('data', function (chunk) {
            buffers.push(chunk);
        });
        res.on('end', function () {
            //将获取的数据写入到文件中
            ws.write(Buffer.concat(buffers));
            setTimeout(function () {
                if (pause === false && start < total) {
                    download();
                }
            }, 1000)
        })
    })

}
download();