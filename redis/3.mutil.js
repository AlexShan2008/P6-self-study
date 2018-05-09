// 事务，先加入队列queue，然后exec再执行;和mySQL的事务不一样
// 批量执行脚本而已

// mySQL中的事务
// 原子操作，要么成功要么失败；不可再分割
// 转账
// 张三 1000
// 张李 1000

// 张三 1000-500 = 500
// 张李 1000+500 = 1500

const redis = require('redis');

const client = redis.createClient(6379, 'localhost');
client.MULTI().set('k3','v3').set('k4','v4').exec(function(err,result){
  console.log(err);
  console.log(result);
});
// let redis = require('redis');
// let client = redis.createClient(6379, '127.0.0.1');
// client.multi().hset('user2', 'name2', 'zfpx2').hset('user2', 'age2', '92').exec(redis.print);