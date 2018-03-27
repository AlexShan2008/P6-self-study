let fs = require('fs');
let path = require('path');
let EventEmitter = require('events');

class WriteSteam extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.heighWaterMark = options.heighWaterMark || 16 * 1024;
        this.autoClose = options.autoClose;
        this.mode = options.mode;
        this.start = options.start || 0;
        this.flags = options.falgs || 'w';
        this.encoding = options.encoding || 'utf8';

        // 可写流是一个缓存区，当正在写入文件时，内容要吸入到缓存区中；在源码中是一个链表 =>[]

        this.buffer = [];

        // 标识  是否正在写入
        this.writing = false;

        // 是否满足触发drain函数
        this.needDrain = false;

        // 记录写入的位置；
        this.pos = 0;

        // 记录缓存区的大小；
        this.length = 0;

        this.open();


    }
    destory() {
        if (typeof this.fd !== 'number') {
            return this.emit('close');
        }
        fs.close(this.fd, () => {
            this.emit('close');
        })
    }
    open() {
        fs.open(this.path, this.flags, this.mode, (err, data) => {
            if (err) {
                this.emit('error', err);
                if (this.autoClose) {
                    this.destory();
                }
            }
            this.fd = fd;
            this.emit('open');
        })

    }
    write(chunk, encoding = this.encoding, callback) {
        // chunk => buffer
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding);
        //write 返回boolean类型；
        this.length += chunk.length;
        let ret = this.length < this.heighWaterMark; // 是否达到缓存区的大小；

        this.needDrain = !ret; //是否需要触发needDrain

        // 判断当前能否正在写入 如果正在写就写到缓存中
        if (this.writing) {
            this.buffer.push({
                encoding,
                chunk,
                callback
            })
        } else {
            this.wrting = true;
            this._write(chunk, encoding, () => this.clearBuffer());//写入；
        }

        return ret;
    }
    clearBuffer() {
        let buffer = this.buffer.shift();
        if (buffer) {
            this._write(buffer.chunk, buffer.encoding, () => {
                this.clearBuffer();
            })
        } else {
            if (this.needDrain) {
                this.needDrain = false;
                this.emit('drain');
            }
        }
    }
    _write(chunk, encoding, callback) {
        // 需要异步写，等打开以后再写；
        if (typeof this.fd !== 'number') {
            return this.once('open', () => {
                return this._write(chunk, encoding, callback);
            });//
        }
        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, byteWritten) => {
            this.length -= byteWritten;
            this.pos += byteWritten;
            this.writing = false;
            callback();

        })
    }
}

module.exports = WriteSteam;