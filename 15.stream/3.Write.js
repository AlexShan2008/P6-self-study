const { Writeable } = require('stream');

// Writeable _write()方法；默认掉_write();

class MyWrite extends Writeable {
    _write(chunk,encoding,callback) {
        callback();

    }
}

let mr = new MyWrite;
mr.write('珠峰','utf8',()=>{

})
mr.write('珠峰', 'utf8', () => {

})
