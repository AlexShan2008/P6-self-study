let fs = require('fs');
let path = require('path');

let ws = fs.createWriteStream(path.join(__dirname, '1.txt'), {
    highWaterMark: 3,
    autoCase: true,
    flags: 'w',
    encoding: 'utf8',
    mode: 0o666,
    start: 0
});

for (let i = 0; i < 9; i++) {
    let flag = ws.write(i + '');
    console.log(flag)
}
