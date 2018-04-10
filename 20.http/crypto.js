let crypto = require('crypto');

// 0 初级阶段
// node自带加密模板
// 加密算法：加密后可以解密
// md5 不是加密算法，
//  1. 因为不可逆，摘要算法
//  2. 不同内容，输出结果不同
//  3. 相同内容，输出一定相同
//  4. 最终的加密结果长度一样
// crypto.getHashes()

let md5 = crypto.createHash('md5');
md5.update('666666');//更新值;例如密码 password 
let result = md5.digest('hex');//16进制
// console.log(result) 0420a206ae8b77b60f314a33b38c875a

// 一个非常大的文件进行加密时，此方法不可取;同步读取影响性能
// update可以缓存
let md5 = crypto.createHash('md5');
const fs = require('fs');
let rs = fs.createReadStream(__dirname+'./content.txt',{highWaterMark:2});
rs.on('data',function(chunk){
    md5.update(chunk);
});
rs.on('end',function(){
    md5.digest()
})

// 1 进阶阶段；一般用此方法进行保存用户密码；
// Hmac 加盐算法;不可逆 也不是加密；只是摘要 sha1
// 根据一个所谓的秘钥来加密
const fs = require('fs');
const path = require('path');
let crypto = require('crypto');
let hamc = crypto.createHmac('sha1', fs.readFileSync(path.join(__dirname, './content.txt')));
// https非对称方式来解决加密的问题
hamc.update('ok');//内容为OK  69d85153991ae46a462d0815db93bd8f7a375356
console.log(hamc.digest('hex'));

// 创建openssl 秘钥 filename rsa_private.key 文件大小1024字节

// openssl genrsa -out rsa_private.key 1024  将生产的openssl key发给客户端

// 2 对称加密;一把钥匙可加密可解密 ;blowfish算法
const fs = require('fs');
const path = require('path');
let crypto = require('crypto');
let name ='beijing';
let private = fs.readFileSync(path.join(__dirname, './rsa_private.key'));
let m = crypto.createCipher('blowfish', private);
m.update(name,'utf8');
let result = m.final('hex')
console.log(result); //a51318e8f3e136cb

let r = crypto.createDecipher('blowfish',private);
r.update('a51318e8f3e136cb','hex');
let source=  r.final('utf8');
console.log(source) //beijing


// 3 非对称加密；两把钥匙 公钥和私钥
// 公钥，用公钥加密，可以用私钥解密
// 私钥，用私钥加密，可以用公钥解密

// openssl rsa -in rsa_private.key -pubout -out rsa_public.key

const fs = require('fs');
const path = require('path');
let crypto = require('crypto');
let name = 'beijing';
let private = fs.readFileSync(path.join(__dirname, './rsa_private.key'));
let public = fs.readFileSync(path.join(__dirname, './rsa_public.key'));
let p = crypto.publicEncrypt(public,Buffer('beijing'));//公钥加密后的结果
console.log(p);

// 私钥解密
let pri = crypto.privateDecrypt(private,p);
console.log(pri.toString());//beijing


// 4 签名 
// 甲 用一种加密方法(RSA_SHA256) 加密 createSign出一个签名，‘字符串’发给乙方；私钥进行签名
// 已 用这个签名，和公钥进行验证，还有内容，看是否是同一个东西（签名、私钥和内容）
// 为了鉴别甲方和乙方的数据相同
const fs = require('fs');
const path = require('path');
let crypto = require('crypto');
let private = fs.readFileSync(path.join(__dirname, './rsa_private.key'));
let public = fs.readFileSync(path.join(__dirname, './rsa_public.key'));
let str = 'Heilongjiang';
// 签名
let s = crypto.createSign('RSA-SHA256');
s.update(str);
let signed = s.sign(private,'hex');
console.log(signed);
// 验证签名
let v = crypto.createVerify('RSA-SHA256');
v.update(str);
let res = v.verify(public,signed,'hex');
console.log(res) //true
// ctime+文件大小进行签名（大文件时候）


// 对比缓存

// 强制缓存