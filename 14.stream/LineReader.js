// LineReader行读取器；,每次读取1行；

let fs = require('fs');
let path = require('path');
let EventEmitter = require('events');

// window下 \r\n 0x0d 0x0a ASCII 16进制
// mac 下\r 
class LineReader extends EventEmitter {
    constructor(path) {
        super();
        this.RETURN = 0x0d;
        this.LINE = 0x0a;
        this.buffer = [];
        this._rs = fs.createReadStream(path);//默认情况下会先读highWaterMark 如无设置，一次读取64k；
        this.on('newListener', (eventName) => {
            if (eventName === 'line') {
                this._rs.on('readable', () => {
                    let char;
                    while (char = this._rs.read(1)) {
                        // 读出来的内容都是buffer类型；
                        let current = char[0];
                        switch (current) {
                            case this.RETURN:
                                this.emit('line', Buffer.from(this.buffer).toString());
                                this.buffer.length = 0;
                                let c = this._rs.read(1);
                                if (c[0] !== this.LINE) {
                                    this.buffer.push(c[0]);
                                }
                                break;
                            case this.LINE:
                                this.emit('line');

                                break;
                            default:
                                this.buffer.push(current);
                        }
                    }
                });
                this._rs.on('end', () => {
                    this.emit('line', Buffer.from(this.buffer).toString());
                    this.buffer.length = 0;
                })
            }
        })
    }

}


let lineReader = new LineReader(path.join(__dirname, './1.txt'));

lineReader.on('line', (data) => {
    console.log(data);
})