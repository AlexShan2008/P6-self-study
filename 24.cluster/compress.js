// 图片的压缩和解压缩

let fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// gzip
function zip(src) {
    // 转换流，transform
    let gzip = zlib.createGzip();
    fs.createReadStream(src).pipe(gzip).pipe(fs.createWriteStream(src+'.gz'));
}

// 解压
function unZip(src){
    let unGzip = zlib.createGzip();
    fs
    .createReadStream(src)
    .pipe(unGzip)
    .pipe(fs.createWriteStream(path.basename(src,'.gz')));
}

zip(path.join(__dirname,'./1.txt'));
// unZip(path.join(__dirname,'./1.txt.gz'));
