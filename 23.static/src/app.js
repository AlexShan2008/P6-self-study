const config = require('./config');
const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const chalk = require('chalk');//chalk.green('8888')
const util = require('util');
const url = require('url');
const supervisor = require('supervisor');//类似nodemon 监听文件的更改，更改后不用重启服务；
const debug = require('debug')('static:app');//后面放参数；可以跟后面的参数决定是否打印;环境变量
const stat = util.promisify(fs.stat);

// 设置环境变量
// set DEBUG=static:app 
// set DEBUG=static:* 打印所有环境下的debug 
// process.env

debug('app');//环境变量为app时会打印

// console.log(chalk.green('8888'))

class Server {
    constructor() {
        this.config = config
    }
    handleRequest() {
        return async (req, res) => {
            let {pathname} = url.parse(req.url,true);
            try{
            let statObj =  await stat(p);
            // 是目录，展示内容，否则返回文件
            if(statObj.isDirectory()){

            }else{
                // 压缩
                // 缓存
                // 断点续传
                
            }

            }catch(e){
                res.statusCode = 404;
                res.end();

            }

        }
    }
    start() {
        let { port, hostname } = this.config;
        let server = http.createServer(this.handleRequest());
        let url = `http://${hostname}:${chalk.green(port)}`;
        debug(url+'hello');
        server.listen(port,hostname);
    }

}

let server = new Server();
server.start();