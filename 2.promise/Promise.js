// 手撕Promise
function Promise(executor) {
    // executor是一个执行函数，同步执行；
    let self = this;
    self.status = 'pending';//默认状态值；
    self.value = undefined;//默认的成功值；
    self.reason = undefined;//默认的失败原因；
    self.onResolvedCallbacks = [];//存放成功回调；
    self.onRejectedCallbacks = [];//存放失败回调；
    function resolve(value) {
        // 成功状态；
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.value = value;
            self.onResolvedCallbacks.forEach(function (fn) {
                fn();
            });
        }

    }
    function reject(reason) {
        // 失败状态；
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
            self.onRejectedCallbacks.forEach(function (fn) {
                fn();
            })
        }
    }
    // 处理error时；异常发生创建失败态；
    // 因为是同步代码，可以用try catch捕获；
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    // x有可能是别的Promise；
    // 尽可能处理别人的乱写；
    if (promise2 === x) {
        // throw new TypeError
        return reject(new TypeError('循环引用'));
    }
    // 判断x是否是Promise；
    let called; //表示是否调用过成功或者失败；
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        // 可能是Promise;看对象是否有then方法；如果有，则认为是；
        try {
            let then = x.then;
            if (typeof then === 'function') {
                // x是promise
                if (called) {
                    return;
                }
                called = true;
                then.call(x, function (y) {
                    // 成功回调；
                    // y可能还是Promise;
                    // 继续解析，直到解析的是普通值；
                    resolvePromise(promise2, y, resolve, reject);
                }, function (err) {
                    if (called) {
                        return;
                    }
                    called = true;
                    // 失败回调；
                    reject(err);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) {
                return;
            }
            called = true;
            reject(e);
        }
    } else {
        // 普通值;不是Promise
        resolve(x);
    }

}
Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
        return value;
    };
    onRejected = typeof onRejected === 'function' ? onRejected : function (error) {
        throw error;
    };

    let self = this;
    let promise2; //返回的Promise;

    if (self.status === 'resolved') {
        promise2 = new Promise(function (resolve, reject) {
            // x可能是一个Promise，也可能是普通值；
            // x可能是别人的Promise；写一个方法统一处理；
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });

        })
    }
    if (self.status === 'rejected') {
        promise2 = new Promise(function (resolve, reject) {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });

        })
    }
    // 当调用then时，可能既没成功，也没失败；
    if (self.status === 'pending') {
        promise2 = new Promise(function (resolve, reject) {
            // 此时，处理Promise中回调的方法；如定时器，或ajax；
            self.onResolvedCallbacks.push(function () {
                // 用于处理Promise2中的then；
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });

            });
            self.onRejectedCallbacks.push(function () {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            })
        })
    }
    return promise2;
}

Promise.prototype.catch = function (callback) {
    return this.then(null, callback);
}
//解析全部的参数；
Promise.all = function (promises) {
    // promises是数组；
    return new Promise(function (rsolve, reject) {
        let arr = []; //arr是最终返回值的结果；
        let indexFlag = 0;

        function processData(params) {
            arr[index] = y;
            if (++indexFlag === promises.length) {
                resolve(arr);
            }
        }
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(function (y) {
                processData(i, y);
            }, function (err) {
                reject(err)
            })
        }
    })
}

// 如果有一个成功就算成功，一个失败就算失败；
Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject);
        }
    })
}
// 生成一个成功的Promise
Promise.resolve = function (value) {
    return new Promise(function (resolve, rejcet) {
        resolve(vlaue);
    })
}
// 生成一个失败的Promise
Promise.reject = function (reason) {
    return new Promise(function (resolve, rejcet) {
        reject(reason);
    })
}
// 减少read中promise的嵌套；不需要返回一个new Promise
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise(function (resolve, rejcet) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports = Promise;