#! /usr/bin/env node
const Server = require() '../src/app';
import { DESTRUCTION } from 'dns';

let yargs = require('yargs');

let argv = {};
let args = process.argv.slice(2);
args.forEach((item, index) => {
    if (item.includes('-')) {
        argv[item] = args[index + 1];
    }
})

yargs.options('p', {
    alias: 'port',//别名
    default: 8080,
    demand: false, //可选
    type: number,
    description: 'This is a sever end port.'
}).options('o', {
    alias: 'hostname',//别名
    default: 'localhost',
    demand: false, //可选
    type: string,
    description: 'This is version.'
}).options('d', {
    alias: 'dir',//别名
    default: process.cwd(),//目录名
    demand: false, //可选
    type: string,
    description: 'This is version.'
}).usage('usage sg-server [option]').alias('h', 'help').example('sg-server -p 3000').argv //生成命令行

// 自动打开浏览器  --open

let os = require('os').platform();
let { exec } = require('child_process');
let url = `http://${argv.hostname}:${argv.port}`

if (argv.open) {
// 自动打开浏览器
    if (os === 'win32') {
        // windows 
        exec(`start ${url}`)

    } else {
        // mac 
        exec(`open ${url}`)
    }
}