# 浏览器渲染
## 叶刀刀老师

## 1 浏览器的内核知识
## 1. Get Started
> 1. webkit 
1. 网页是否是应用？
2. 操作系统的应用如何运行？内核态和用户态，通过操作系统去调用相关API。
3. 浏览器：方便用户通过界面解析和发送HTTP协议的软件
浏览器的历史：1991年，不支持图片，1993年UserAgent,94年Mozilla出现，95年IE出现，UserAgent不可靠，可以随意改变。浏览都有Mozilla，方便伪装。

*chrome safari 内核 webkit*

> 2. UserAgent用户代理
```
navigator.userAgent

"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
```
作用：
1. 判断是否为移动端；
2. 判断浏览器类型；
3. 标识H5容器，方便调用H5接口；
4. 要注意userAgent伪装成本很低，不要过度依赖；

> 3. 内核：操作系统的核心，提供最核心最基础的服务，系统调用。内核代码，简洁高效。

### 浏览器内核的作用：
> 与操作系统内核相似，需要提供API给浏览器开发者使用，提供最核心的功能，如加载和渲染网页，调用操作系统所提供的服务。

### 从输入URL到......的问题？
- response开始
- 网络，基于socket管道进行连接，流的方式，发送的时候会转成二进制数据。

### 远程主机响应
换行符\r\n

## 1. 响应组成，报文头
根据报文头调用不同的解析方法；
浏览器根据HTML树和CSS规则树进行渲染DOM，根据不同的元素选择不的渲染方式。Content-Type实体类型
## 2. 网页内容组成
### 
1.  <doctype>
2. content http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' 指定浏览器版本
3. meta TDK 
4. viewport 移动端会解析
5. link
6. script

渲染要做的工作：渲染引擎。
- HTML解析器 
- CSS解析器 
- JavaScript引擎
- 布局
- 浏览器卡顿就是因为浏览器的帧数达不到，所以跳帧了，渲染时间达不到16ms时候。
- 2D/3D 图片GPU
- 浏览器将文本转换成图形
- CSS该如何使用，DIV首先是布局，长宽大小，如何定位，坐标系如何建立？是否浮动？盒模型？屏幕左上角为坐标系原点。
- 外联资源如何处理？
- 先看是网络资源还是什么资源？是否有缓存。再对二进制网络资源进行解析。
- css和js加载机制不同，同步和异步。渲染是UI线程。
- 渲染，回流
- 移动端和PC是否相同？
- 不是JS不会阻碍页面渲染
- CSS一般不会阻碍页面渲染
- MainResourceLoader 和 SubResourceLoader
- 特定的优化：Chrome，HTML先做预扫描，把需要读取的文件提前加载。实现预加载的工作preloader
- 渲染浅和渲染后：1.加载资源 2.渲染，渲染后有很多DOM事件，会重新计算布局和渲染.repaint和refloat
- 渲染和资源的加载是两件事情。
- font-size:12px
- webcore 位图无关的抽象
- css svg 布局 渲染数
- HTML DOM inspector(解析器)
- javascriptcore (V8) webkit port 网络栈 视频 文字 硬件假设 图片解码 
- Chromium架构，最新的开源的Chrome浏览器

- 除去webkit内核完成的功能，浏览器的工作有哪些？history indexDB localStorge flash 插件和扩展 账户和同步 安全机制 多系统支持 
- 进程是什么？对CPU主存IO设备的抽象，操控系统对一个正在运行的程序的抽象。Node启动一个进行。感觉自己在独立操控一台计算机。拥有资源。
- 线程：组成进行的执行单元。
- IPC是什么？进程间的通信方式sendMessage，浏览器的加载和渲染就是在不同的进程进行执行的，之间需要通信。
- 线程同步是什么？
- 主进程创建及销毁子进程。
- flash进程(NPAPI)
- GPU加速
- 多进程：1. 职责分离，故障范围小 2. 隔离性，不同网页间分开；不同插件互补影响 3. 性能，GPU加速
- 线程是进程的组成单元
- Javascript 中的进程和线程：单进程，单线程
- PM2创建父子进程

## 浏览器渲染原理
### 加载机制
1. Page Cache 页面缓存
2. Meomory Cache 内存缓存
3. Disk Cache  磁盘缓存

### 流程
* URL输入到底做了哪些事？建立网络请求proto host path query hash
*1 浏览器对输入进行解析。*
1. DNS解析，获得主机HOST,IP port 域名-》IP 
*2 接下来建一个TCP连接。发送报文头- 返回报文头及主体* 
2. urlrequestjob(http)判断是否需要建立网络连接。如304等，不需要，就返回304.
3. transaction建立连接
4. NetWorkSession 建立TCP套接字
*3 接收网络请求*
*TCP预连接，减少TCP连接的时间*
*4 浏览器接收数据*
*5 浏览器解析数据*
*6 浏览器渲染数据*

> 如何提交加载速度？

读取资源走的I/O线程，CPU上下文的切换，4核8线程，线程池的概念；
chrome ，同一个域名下面，同时加载5个资源；
可以用多域名同时加载更多资源
缓存的应用：TCP连接header的设置，尽量本地读取静态资源
网络的加速：
1. 合并请求，减少请求次数Tengine 类似于nginx(雪碧图)
2. 缓存from cache(Memory Disk) LocalStorge indexDB，本地缓存策略，HTTP头的优化，Etage max-age=3600,更加业务需求进行设置缓存时间。不能盲目设置（基本类库、业务类库不同资源缓存时间不同）
3. tcp网络连接的优化,tcp调优HTTP/2 keep-alive 
4. 硬件：加大带宽，使用cdn（对象存储）
5. 资源大小：gzip webp image html css js压缩 cookie体积
6. 预加载：dns预取，多个cdn域名，可以用多域名同时加载更多资源 异步读取js PWA(是上述的合体)

HTML解析器：
> 词法分析 start-tag end-tag command（注释） doctype

包括服务端做的事情：

*css加载时候DOM会解析，但是页面不会渲染，是为了避免回流*

## 性能调优

《webkit技术内幕》