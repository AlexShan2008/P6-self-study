const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class Readable extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.autoClose = options.autoClose;
        this.start = 0;
        this.end = options.end;
        this.flags = options.flags || 'r';//可读；
        this.mode = 0o666;//8进制；
        this.buffers = [];// 缓存区
        this.pos = this.start;
        this.length = 0;//缓存区大小;
        this.emittedReadable = false;//是否触发readable事件
        this.reading = false;//不是正在读取的
        this.open();
        this.on('newListener', (eventName) => {
            if (eventName === 'readable') {
                this.read();//不传参，表示全读；
            }
        })
    }
    read(n) {
        if (n > this.length) {
            // 更改缓存区大小；读取5个就找2几次方放最近的；
            this.highWaterMark = 
            this.emittedReadable = true;
            this._read()
        }

        let buffer = null;
        let index = 0;
        let flag = true;
        // 如果n>0 去缓存区中读取数据；
        if (n > 0 && n <= this.length) {
            // 确保缓存区中有这么多可以读；
            // 在缓存区中取数据；[ buffer1, buffer2 ,buffer2]
            buffer = Buffer.alloc(n);//创建要返回的Buffer
            let buf;
            // 取第一个buffer；
            while ((buf = this.buffers.shift()) && flag) {
                for (let i = 0; i < buf.length; i++) {
                    buffer[index++] = buf[i];
                    if (index === n) {//拷贝够了；
                        flag = false;
                        this.length -= n;//减少要读取的内容；
                        let bufferArr = buf.slice(i + 1);//取出剩下的部分；
                        //如果bufferArr中有内容，再放回原buffer
                        if (bufferArr.length > 0) {
                            this.buffers.unshift(bufferArr);
                        }
                        break;
                    }
                }
            }

        }


        if (this.length === 0) {
            this.emittedReadable = true;
        }
        // 当缓存区小于highWaterMark时再去读取；
        if (this.length < this.highWaterMark) {
            if (!this.reading) {
                this.reading = true;
                this._read();//异步读取；
            }
        }
        return buffer;

    }
    // 封装的读取的方法；
    _read() {
        if (typeof this.fd != 'number') {
            return this.once('open', () => this._read());// 等open结束后再触发；只发生一次；once 是events方法
        }
        // [ buffer , buffer , buffer]
        // 每次都要新创建1个buffer 放进缓存中；
        let buffer = Buffer.alloc(this.highWaterMark);
        fs.read(this.fd, buffer, 0, buffer.length, this.pos, (err, bytesRead) => {
            if (bytesRead > 0) {
                // 把默认读取的内容放到缓存区中
                this.buffers.push(buffer.slice(0, bytesRead));
                this.pos += bytesRead;//维护索引；
                this.length += bytesRead; // 维护缓存区的大小
                this.reading = false;
                if (this.emittedReadable) {
                    this.emittedReadable = false;//下次默认不触发；
                    this.emit('readable');
                }
            } else {
                this.emit('end');
                this.destory();
            }
        })
    }
    destory() {
        if (typeof this.fd != 'number') {
            return this.emit('close');
        }
        fs.close(this.fd, () => {
            this.emit('close')
        })
    }
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                this.emit('error', err);
                if (this.autoClose) {
                    this.destory();
                }
                return;
            }
            this.fd = fd;
            this.emit('open');
        })
    }
}

module.exports = Readable;