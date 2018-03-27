let fs = require('fs');
let path = require('path');
let WriteSteam = require('./WriteSteam');

let ws = new WriteSteam(path.join(__dirname, '1.txt'), {
// let ws = fs.createWriteStream(path.join(__dirname, '1.txt'), {
    highWaterMark: 3,
    autoCase: true,
    flags: 'w',
    encoding: 'utf8',
    mode: 0o666,
    start: 0
});

let i = 9;
function write() {
    let flag = true;
    while (i >= 0 && flag) {
        flag = ws.write(--i + '', 'utf8', () => {
            console.log(flag);

        });
    }
}
write();
// drain只有当缓存区充满后 并且被消费后触发；
ws.on('drain', function () {
    console.log("drain");
    write();
})