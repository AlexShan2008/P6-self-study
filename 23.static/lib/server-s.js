'use-strict';

const config = require('./config');
const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const chalk = require('chalk');
const util = require('util');
const url = require('url');
const supervisor = require('supervisor');
const debug = require('debug')('static:app');
const stat = util.promisify(fs.stat);
const ejs = require('ejs');

let tmpl = fs.readFileSync(path.join(__dirname, 'tmpl.ejs'), 'utf8');
let readdir = util.promisify(fs.readdir);

class Server {
    constructor(args) {
        this.config = { ...config, ...args };
        this.tmpl = tmpl;
    }

    // handle client end request
    handleRequest() {

        return async (req, res) => {

            let { pathname } = url.parse(req.url, true);
            if (pathname === '/favicon.ico') return res.end();
            let p = path.join(this.config.dir, '.' + pathname);

            debug(p);

            try {
                let statObj = await stat(p);

                if (statObj.isDirectory()) {

                    let dirs = await readdir(this.tmpl, { disrs });
                    dirs = dirs.map(dir => ({
                        path: path.join(pathname, dir),
                        name: dir
                    }))

                    let content = ejs.render(this.tmpl, { dirs });
                    res.setHeader('Content-Type', 'text/html;charset=utf8');
                } else {
                    this.sendFile(req, res, statObj);
                }
            } catch (e) {
                this.sendErr(req, res, e);
            }
        }
    }

    // cache files
    cache(req, res, p, statObj) {
        let ifNoneMatch = req.headers['if-none-match'];

        let ifModifiedSince = req.headers['if-modified-since'];

        let since = statObj.ctime.toUTIString();
        let etag = new Date(since).getTime() + '-' + statObj.size;

        res.setHeader('ETag', etag);
        res.setHeader('Last-Modified', since);
        res.setHeader('Cache-Control', 'max-age=10');

        if (ifNoneMatch !== etag) {
            return false;
        }

        if (ifModifiedSince !== since) {
            return false;
        }

        res.statusCode = 304;
        res.end();
        return true;

    }

    // compress files
    compress(req, res, p, statObj) {
        let header = req.headers['accept-encoding'];

        if (header) {
            if (header.match(/\bzip\b/)) {
                res.setHeader('Content-Encoding', 'gzip');
                return zlib.createDeflate();
            } else if (header.match(/\bdeflate\b/)) {
                res.setHeader('Content-Encoding', 'deflate');
                return zlib.createDeflate();
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    // get content by range
    range(req, res, p, statObj) {
        let range = req.headers['range'];
        let start = 0;
        let end = statObj.size;

        if (range) {
            let [, s, e] = range.match(/bytes=(\d*)-(\d*)/);

            start = s ? parseInt(s) : start;
            end = e ? parseInt(e) : end;

            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Content-Range', `bytes${start}-${end}/${statObj.size}`);

            return { start, end: end - 1 }

        }
    }

    // handle send file
    sendFile(req,res,p,statObj){
        if(this.cache(req,res,p,statObj)) return;

        res.setHeader('Content-Type',mime.getType(p)+';charset=utf8');

        let s = this.compress(req,res,p,statObj);
        let {start, end} = this.range(req,res,p,statObj);
        let rs = fs.createReadStream(p,{start,end});

        if(s){
            rs.pipe(s).pipe(res);
        }else{
            rs.pipe(res);
        }
    }

    // handle error
    sendErr(req,res,e){
        debug(util.inspect(e).toString());
        res.statusCode = 404;
        res.end();
    }

    // start server
    start() {
        let { port, hostname } = this.config;
        let server = http.createServer(this.handleRequest());
        let url = `http://${hostname}:${chalk.green(port)}`;
        debug(url);
        server.listen(port, hostname);

    }

}

module.exports = Server;