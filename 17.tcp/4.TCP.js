// socket 套接字模型
// flag  URG ACK PSH RST SYN FIN

// siege 压力测试

// TCP 请求的连接
// 1 三次握手 建立连接
//    client                                 server
//    closed                                 listen

//    SYN_SENT       SYN     seq0        ->  SYN_RECEIVED  
//    ESTABLISHED    SYN ACK seq0 ack1   <- 
//                   ACK     ack1 seq1   ->  ESTABLISHED

// 首次seq序号为系统随机产生一个随机数；一般为0
// seq 等于对方的ack
// ack 等于对方的seq+1
// ack 传输数据时，等于对方的seq+segmentLength(数据的长度)

// 2 数据传输               segmentLen
//            PSH     seq1 ack1(L 159)     ->  
//            PSH     seq1 ack160(L 111)   <- 
//            ACK     ack112 seq160        ->  

// 3 四次挥手 断开链接
//    FIN_WAIT1      FIN  seq160  ack112     ->  CLOSED_WAIT  
//    FIN_WAIT2      ACK  ack161  seq112     <- 
//    TIME_WAIT      FIN  ack161  seq112     <-  LAST_ACK
//    CLOSED         ACK  seq161  ack113     ->  CLOSED


// TCP Nagle算法不适合实时通信的；股票，游戏发招，秒杀，直播等，必须实时响应
// Node.js中关闭Nagle算法的方法： socket.SetNoDelay

// TCP滑动窗口，相当于（TCP的缓存区）平衡服务器两端的数据接收能力

// 学习如果配置nginx
// SSR 尽量不要用；需要一定的技术储备；

// 前端渲染的过程
// url ->open
// url 协议 域名  host port   -> DNS  -> IP 地址
// port 生成TCP首部 计算数据大小
// host 生成IP首部 计算数据大小
// 数据-》帧  路由-》上连网络-》
// 绘图无关上下文（与绘图环境无关）
// 布局重绘layout CSS有些属性会影响布局，进行重排，非常影响性能；
// 图片加载；给图片定宽高（非常好，避免图片未加载的情况进行重排）
