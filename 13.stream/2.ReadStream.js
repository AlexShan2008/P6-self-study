// 可读流基于events模块
const fs = require('fs');
const path = require('path');
let EventEmitter = require('events');

class ReadStream extends EventEmitter {
    constructor(path, options) {

        super();

        this.path = path;
        this.flags = options.flags || 'r';
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.start = options.start || 0;
        this.end = options.end;
        this.encoding = options.encoding || null;

        this.open();// 打开文件 fd

        this.flowing = null;//null就是暂停模式；true就是流动模式；

        //建立一个Buffer，大小为一次读的多少highWaterMark
        this.buffer = Buffer.alloc(this.highWaterMark);
        this.pos = this.start;//默认和开始相等；

        // 看是否监听了data事件，如果监听，就触发流动模式；
        this.on('newListener', (eventName, callback) => {
            if (eventName === "data") {
                // 相当于用户监听了data事件；触发流动模式；
                this.flowing = true;
                this.read();
            }
        })
    }
    pause(){
        this.flowing = false;
    }
    resume() {
        this.flowing = ture;
        this.read();
    }
    read() {
        if (typeof this.fd !== 'number') {
            //文件未打开时；
            // 文件打开时会触发open事件，再开始读read()
            return this.once('open', () => read());
        }
        // 此时已打开文件fd有了；
        // 需要判断highWaterMark是否大于end
        let howMuchRead = this.end ? Math.min(this.highWaterMark, this.end + 1 - this.pos) : highWaterMark;
        fs.read(this.fd, this.buffer, 0, howMuchRead,this.pos, (err, bytesRead) => {
            if(bytesRead>0){
                // 更新指针的位置；
                this.pos += bytesRead;
                // 判断数据类型;
                let data = this.encoding ? this.buffer.slice(0, bytesRead).toString(this.encoding) : this.buffer.slice(0, bytesRead);
                this.emit('data', data);
                if(this.pos>this.end){
                    this.emit('end');
                    this.destory();
                }
                if (this.flowing) {
                    this.read();
                }
            }else{
                this.emit('end');
                this.destory();
            }
        })
    }
    destory() {
        // 先判断有没有fd文件，有就关闭，触发close；
        if (typeof this.fd !== "number") {
            fs.close(this.fd, () => {
                this.emit('close');
            });
            return;
        }
        this.emit('close');//关闭；

    }
    open() {
        // 异步；
        // copy 先打开文件；0 1 2 4 看是否能找到文件，是否可读，可写，文件的权限；
        fs.open(this.path, this.flags, (err, fd) => {
            console.log(fd);

            if (err) {
                this.emit('error', err)
                if (this.autoClose) {
                    this.destory();
                }
                return;
            }
            this.fd = fd; //保存文件描述符；
            this.emit('open')
        })
    };
    error() {

    }



}

module.exports = ReadStream;