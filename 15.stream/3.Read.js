const { Readable } = require('stream');

// Readable里面有一个read()方法；默认掉_read();

class MyRead extends Readable {
    _read() {
        // 当push null时候停止；
        this.push('1233');
        this.push(null);
    }
}

let mr = new MyRead;
mr.on('data', function (data) {
    console.log(data);
})

module.exports = MyRead;