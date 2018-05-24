const express = require('./express');
const app = express();
// RTESTful API 

// cmd 命令行实现发送请求 
// curl -X POST http://localhost:8080/name --data

app.get('/', (req, res) => {
  res.end('Hello')
});

app.get('/name', (req, res) => {
  res.end('9')
});

app.post('/name', (req, res) => {
  res.end('post name')
});

// 支持所有请求方法
app.all('/user', (req, res) => {
  res.end(req.method + 'all')
});

// 支持所有路径，所有请求方法
// 此方法最后调用；否则其他路径不生效
app.all('*', (req, res) => {
  res.end(req.method + '*')
});

app.listen(8080, () => {
  console.log('Server start 8080 success')
});