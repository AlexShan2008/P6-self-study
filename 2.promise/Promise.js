function Promise(executor) {
    // executor是一个执行函数，同步执行；
    let self = this;
    self.status = 'pending';//默认状态值；
    self.value = undefined;//默认的成功值；
    self.reason = undefined;//默认的失败原因；
    function resolve(value) {
        // 成功状态；
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.value = value;
        }

    }
    function reject(reason) {
        // 失败状态；
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
        }
    }
    executor(resolve, reject);

}
Promise.prototype.then = function (onFulfilled, onRejected) {
    let self = this;
    if (self.status === 'resolved') {
        onFulfilled(self.value);
    }
    if (self.status === 'rejected') {
        onRejected(self.reason);
    }
}

module.exports = Promise;