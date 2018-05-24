const http = require('http');
const url = require('url');
const path = require('path');

const createApplication = () => {
  // 监听函数
  let app = (req, res) => {
    // 1. 取出每一个路由
    // 2. 获取请求的方法
    let m = req.method.toLowerCase();
    let {pathname} = url.parse(req.url, true);
    for (let i = 0; i < app.routes.length; i++) {
      let {method, path, handler} = app.routes[i];
      if((method === m || method === 'all') && (path === pathname || path === '*')){
        // 执行匹配成功后的callback
        return handler(req, res);
      }
    }
    res.end(`Cannot ${m} ${pathname}`);

  };
  app.routes = [];
  app.all = function(path, handler){
    let layer = {
      method: 'all', // method是all匹配全部方法
      path,
      handler
    };
    app.routes.push(layer);
  };

  http.METHODS.forEach(method=>{
    method = method.toLocaleLowerCase();
    app[method] = function (path, handler) {
      let layer = {
        method,
        path,
        handler
      };
      app.routes.push(layer);
    }
  })

  app.listen = function () {
    let server = http.createServer(app);
    server.listen(...arguments)
  };

  return app;
};

module.exports = createApplication;