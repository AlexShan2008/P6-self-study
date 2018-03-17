function EventEmitter(params) {
    this._events = {};
}
EventEmitter.prototype.on = function (type, callback) {
    if (!this._events) {
        this._events = Object.create(null);
    }
    // 默认值；
    if (type !== "newListener"){
        this._events["newListener"] && this._events["newListener"].forEach(function(listener){
            listener[type];
        });
    }

    if (this._events[type]) {
        this._events[type].push(callback);
    } else {
        this._events[type] = [callback];
    }
}
EventEmitter.prototype.once = function (type, callback) {
    // 先绑定，调用后再删除；
    // 执行一次emit;
    function wrap(params) {
        callback(...arguments);
        this.removeListener(type, wrap);
    }
    // 自定义属性；
    wrap.l = callback;
    this.on(type, wrap);
}
EventEmitter.prototype.emit = function (type,...args) {
    if (this._events[type]) {
        this._events[type].forEach(listener => {
            listener.call(this, ...args);
        });
    }
}
EventEmitter.prototype.removeListener = function (type, callback) {
    if (this._events[type]) {
        // 返回FALSE就表示不要了
        this._events[type] = this._events[type].filter(function (listener) {
            return callback != listener && listener.l != callback;
        });
    }
}

module.exports = EventEmitter;