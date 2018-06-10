# nginx

## 静态网址，一定要用`nginx`，性能最佳
## 特点：
1. IO多路复用，
- 传统：select效率低，并采用轮询的方式，最多就1024  
- epoll模型  

2. CPU亲和。多进程，一般进程数量和CPU数量相同
3. sendfile和零拷贝

## 1.nginx配置文件 `/etc/nginx/conf.d`
```
/etc/nginx/conf.d
```

## 2.静态文件路径`/usr/share/nginx/html`
> 所打包生成的dist文件整体到此文件下面
```
/usr/share/nginx/html
```

## 3搭建静态服务器
- 静态资源：不需要读取数据库
- 动态资源：操控数据库，获取数据，然后返回客户端

## 4CDN
> 就近访问
- 不同网络：移动、联调、电信、教育网
- 中国、美国、欧洲、澳洲、非洲

## 5处理跨域请求
```
location ~ .*\.json$ {
        add_header Access-Control-Allow-Origin http://localhost:3000;
        add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
        root /data/json;
    }
```

## 6代理
1. 正向代理：代理客户端
2. 反向代理：代理服务端

- 反向代理
```
   location ~ ^/api {
      proxy_pass http://127.0.0.1:3000;
    }

```
## 7Node
- 用nvm安装Node
[nvm](https://github.com/creationix/nvm)
1. 先安装nvm

```
To install or update nvm, you can use the install script using cURL:

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
or Wget:

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

```
安装后打开一个新窗口，执行nvm安装命令
2. 安装node

```
nvm install node
```
## 8上传图片到七牛
[上传图片到七牛](http://www.zhufengpeixun.cn/plan/html/26.webpack-plugin.html#t89.)


