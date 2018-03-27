// 双工流，既能读又能写；
// 读写可以没有关系；
const { Duplex } = require('stream');

// class d extends Duplex{
//     _read(){
//     };
//     _write(){
//     };
// }

// 简写；
let d = Duplex({
    read(){
    this.push('hello');
    this.push(null);
    },
    write(chunk,encoding,callback){
        console.log(chunk);
        callback();
    }
});
d.on('data',function(){

});
d.on('write',"hello")