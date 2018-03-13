#  Node.js

## 一、tomcat iis
> #### 多线程；
默认开20个线程，永远复用一个线程；
1. 可能会浪费资源；
2. 靠的是切换时间篇，这个过程也会浪费资源；
3. 锁的问题：线程锁，进行一个线程，锁定一个；

> #### 多进程；
1. 进程大于线程，一个进程包括很多线程；
2. 进程：操作系统分配
3. 浏览器是多进程；

> #### 单线程；
1. 异步非阻塞；
2. 主线程；
3. setTimeout也是一个线程；

## 二、 Node.js 单线程，高并发，不是一个量级；
1. 异步非阻塞I/O；
2. 主线程；
3. setTimeout也是一个线程；
4. Node.js不是一门语言，只是提供了runtime环境，让JS可以在服务端运行；

## 三、线程；
浏览器x渲染进程包括:networking、js、UIbackend;
- js线程和UI线程互斥，目的是保证DOM操作不冲突；
- 

## 四、webworker
- 和JS不是平级的，主线程可以控制webworker；
- 不能操控dom,window,只适合做计算；
-  terminal 运行http-server；起服务；

## 五、栈和队列
- 栈 FILO
- 队列 FIFO
## 六、浏览器Eventloop;

## 七、Node.js异步非阻塞I/O;（libuv库实现)
- REPL 相当于浏览器的console
- REPL是node中的一个模块
- let repl = require('repl');
- let context = repl.start().context();


## 八、同步、异步、阻塞、非阻塞
- 同步： 线性执行，被调用者是如何通知的；
- 异步： 非线性执行，被调用者是如何通知的；
- 阻塞： 指的是调用者状态。只干一件事，在等结果；
- 非阻塞： 指的是用研者状态。同时干几件事；

## 九、宏任务和微任务；
> 同步代码先执行，在执行栈中执行；
> 微任务先与宏任务执行；
> 在浏览器中先调取一个
```
        //浏览器和Node.js中宏、微任务执行顺序不同；

        console.log(1);
        setTimeout(() => {
            console.log(2);
            Promise.reject(1).then(function (params) {
                console.log("promise");
            })
        }, 0);
        setTimeout(() => {
            console.log(3);
        }, 0);

        //浏览器输出结果： 1 2 promise 3
        //Node.js输出结果： 1 2 3 promise
```

### 宏任务
- 放的是回调函数；
- setTimeout 在微任务之后（promise.then()之后）执行；
- setInterval 
- 就是指callback queue

### 微任务
- Pormise.then(),then方法不应该放到宏任务中，
- process.nextTick
- MutationObserver 
- MessageChannel vue中实现；

