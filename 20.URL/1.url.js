let url = require('url');
let u = 'http://shantong:123456@baidu.com:8080/news/index.html?uid=1&age=18#hash';

let urlObj = url.parse(u, true);//true 将查询字符串 query转换成对象；{ uid: '1', age: '18' }
console.log(urlObj.pathname);// /news/index.html
console.log(urlObj.query);//{ uid: '1', age: '18' }
// Url {
//     protocol: 'http:',
//         slashes: true,
//             auth: 'shantong:123456',
//                 host: 'baidu.com:8080',
//                     port: '8080',
//                         hostname: 'baidu.com',
//                             hash: '#hash',
//                                 search: '?uid=1&age=18',
//                                     query: 'uid=1&age=18',
//                                         pathname: '/news/index.html',
//                                             path: '/news/index.html?uid=1&age=18',
//                                                 href: 'http://shantong:123456@baidu.com:8080/news/index.html?uid=1&age=18#hash'
// }