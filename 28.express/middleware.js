const express = require('./express');
const app = express();

// 中间件；路由直接干一些事情
// use方法，如果第一个参数不传，默认路径就是/
// 所有方法都会先触发此方法 
// 中间件可以扩展方法
// 中间件不是精准匹配 /name/age == /name

// next() 中不能传参数，否则直接跳到最后的路由匹配
app.use('/',  (req, res, next)=>{
  res.setHeader('Content-Type', 'text/html;charset=utf-8');

  // 只有调用next才会继续向下走；
  next();
});

app.get('/name', (req, res)=>{
  console.log(req.path);
  console.log(req.host);
  console.log(req.query);
  res.end('单通')
});

app.get('/age', (req, res)=>{
  res.end('单通 199')
});

// 错误中间件，只要中间件遇见错误，就会一直向下走，直到调用此方法；
app.use((err, req, res, next)=>{

});

app.listen(3000);