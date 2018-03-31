// TCP/IP中最核心的协议

//  网络层 
//  IP协议

// 192.168.1.1/32  
// 32位全掩上
// 子网掩码和ip地址进行按位“与”即得网络号

// 掩码 
// 网络号相同就是处在一个网络中；

// IP 地址的含义 32位
// 分类
// A A类地址来说，默认的子网掩码是255.0.0.0
// 子网掩码 就是借用几个主机号来当网络号使用。避免同一网络号中主机太多；

// 类别 首位 网络号 主机号 
//  A   0    7位   24位  127  A类网络有126个子网2的7次方
//  B   1    14位  16位  14位 
//  C   11   21位  9位   192.0.0 -233.

// B B类地址来说默认的子网掩码是255.255.0.0
// C C类地址来说默认的子网掩码是255.255.255.0

// 子网划分
// 网络号
// 32位
const IP = '192.168.0.5'; //C类 

const mask1 = '255.255.255.0';
// const cidr1 = '192.168.0.5/24'; 设上面相等

function ipToLongString(ip) {
    if (!ip) {
        throw new Error('Invalid ip');
    }
    let arr = ip.split('.');
    if (arr.length < 4) {
        throw new Error('Invalid ip');
    }
    // return arr.map(function(sec){
    //     return parseInt(sec).toString(2).padStart(8,0);
    // }).join(' ');

    // 172 向前已24位
    // << 有符合左移
    // >>>0 无符号右移
    // | 按位或 
    // & 按位与
    return (
        ((arr[0] | 0) << 24) |
        ((arr[1] | 0) << 16) |
        ((arr[2] | 0) << 8) |
        ((arr[3] | 0))
    ) >>> 0

}
let res1 = ipToLongString(IP);
let res2 = ipToLongString(mask1);
console.log(res1.toString(2));  //11000000 10101000 00000000 00000101
console.log(res2.toString(2));  //11111111 11111111 11111111 00000000
console.log(res1 & res2)

function longToIp(longIp) {
    const a1 = (longIp & 0xff000000) >> 24;
    const a2 = (longIp & 0x00ff0000) >> 16;
    const a3 = (longIp & 0x0000ff00) >> 0;
    return [a1, a2, a3, a4].join('.')
}
// 11111111000000000000000000000000 ff000000
// 00000000111111110000000000000000 00ff0000
// 00000000000000001111111100000000 0000ff00
// 0b二进制  0x16进制 0o八进制
let str = 0b00000000000000001111111100000000;
let res = str.toString(16);
console.log(res)

// IP层乱序，重复，分片等；尽量不要IP分片；