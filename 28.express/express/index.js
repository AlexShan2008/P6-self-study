const http = require('http');
const url = require('url');
const path = require('path');

const createApplication = () => {
  let app = (req, res) => {
    let m = req.method.toLowerCase();
    let { pathname } = url.parse(req.url, true);
    // 通过next方法进行迭代路由；
    let index = 0;
    function next(err) {
      // 如果数组全部迭代完成还没找到，说明路径不存在
      if (index === app.routes.length) {
        return res.end(`Cannot ${m} ${pathname} `)
      }
      // 每次调用就应该取下一个layer
      let { method, path, handler } = app.routes[index++];

      if (err) {
        // 如果中间件报错，就会一直走到错误中间
        // 回调函数handler有4个参数
        if (handler.length === 4) {
          handler(err, req, res, next);
        } else {
          // 如果没有匹配到错误，要将err继续传递下去
          next(err);
        }

      } else {

        if (method === 'middle') {
          // 中间件
          if (path === '/' || path === pathname || pathname.startsWith(path + '/')) {
            return handler(req, res, next);
          } else {
            // 如果这个中间没有匹配，那么继续走下一个层匹配
            next();
          }

        } else {
          // 普通路由
          if ((method === m || method === 'all') && (path === pathname || path === '*')) {
            return handler(req, res);
          } else {
            // 直到找到普通路由为止
            next();
          }
        }
      }

    }
    next();

  };


  app.routes = [];
  app.use = function (path, handler) {
    if (typeof handler !== 'function') {
      // 只传了1个函数
      handler = path;
      path = '/';
    }
    let layer = {
      method: 'middle', // method是middle,表示是中间件
      path,
      handler
    };
    app.routes.push(layer);

  }
  app.use(function (req, res, next) {
    let { pathname, query } = url.parse(req.url, true);
    let hostname = req.headers['host'].split(':')[0];
    req.path = pathname;
    req.query = query;
    req.hostname = hostname;
  })
  app.all = function (path, handler) {
    let layer = {
      method: 'all', // method是all匹配全部方法
      path,
      handler
    };
    app.routes.push(layer);
  };

  http.METHODS.forEach(method => {
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