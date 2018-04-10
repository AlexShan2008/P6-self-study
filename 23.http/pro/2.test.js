const fs = require('fs');
let ws = fs.createWriteStream('./1.text');

process.stdout.on('data', function (data) {
    ws.write(data);
});

setTimeout(() => {
    process.exit();
}, 1000);