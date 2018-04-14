let http= require('http');
// 

process.on('message',function(msg,server){
    http.createServer(function (req, res) {
        res.sendDate('已接受');
    });
})


