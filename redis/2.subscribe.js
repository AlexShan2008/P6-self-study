// Redis发布订阅
// 消息中间件；消息服务器，所有订阅的客户端订阅；各数据库直接解耦合

// 可以存在多个频道
// SUBSCRIBE channela 
// PUBLISH channela hello

const redis = require('redis');

const client1 = redis.createClient(6379, 'localhost');
const client2 = redis.createClient(6379, 'localhost');

client1.subscribe('food');
client1.subscribe('drink');

// 收到订阅的消息后触发
client1.on('message', function (channel, message) {
  console.log(channel, message);
  client1.unsubscribe('food');
});

setTimeout(() => {
  client2.publish('food', 'bread');
  client2.publish('drink', 'colo');
  setTimeout(() => {
    client2.publish('food', 'bread2');
    client2.publish('drink', 'colo2');
  }, 1000);
}, 1000);

