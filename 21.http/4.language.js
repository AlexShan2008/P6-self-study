// 多语言  vue-i18n 国际化
// 可以支持语音的切换；国际化网站；

// 服务端如何支持多语言；
// Request Headers
// Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
//语音直接用,分开；权重1最大；zh-CN;q=1
let pack = {
    'zh-CN': { content: '中文' },
    'en': { content: 'Hello' },
    'fr-FR': { content: 'Bonjour' }
};
const http = require('http');
let server = http.createServer();
server.on('request', function (req, res) {
    let lan = 'en';
    let language = req.headers['accept-language'];
    // Accept-Language zh-CN,zh;q=0.9,en;q=0.8,fr-FR;q=0.7 //语音直接用,分开；权重1最大；zh-CN;q=1
    let arrs = [];
    if (language) {
        arrs = language.split(',').map(l => {
            l = l.split(';');
            return {
                name: l[0],
                q: l[1] ? Number(l[1].split('=')[1]) : 1
            }
        }).sort((lang1, lang2) => lang2.q - lang1.q);
    }
    console.log(arrs);
    res.setHeader('Content-Type', 'text/plain;charset=utf8')
    for (var i = 0; i < arrs.length; i++) {
        let name = arrs[i].name
        if (pack[name]) {
            res.end(pack[name].content);
            break;
        }
    }

    res.end(pack[lan].content);

}).listen(8080);