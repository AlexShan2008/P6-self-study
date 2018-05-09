const redis = require('redis');

const client = redis.createClient(6379, 'localhost');
client.on('error', function (err) {
  console.log(err);
});

client.set('home', 'beijing', function (err, result) {
  console.log(err);
});

client.hmset('p1', 'username', 'zfpx', 'age', '9', function (err, result) {

});
// key => value
client.hkeys('p1', function (err, keys) {
  keys.forEach((item, index, keys) => {
    client.hget('p1', key, (err, value) => {
      console.log(key,value)
    })
  })
})