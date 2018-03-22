let fs = require('fs');
let path = require('path');

// 深度遍历；
function wideAsync(dir,callback){
    let arr = [dir];
    let index =0;
    function rmdir(){
        function next(){
            let current = arr[--index];
            if (!current) {
                return callback();
            }
            fs.stat(current,function(err,stat){
                if(stat.isDirectory()){
                    fs.mkdir(current,next);
                }else{
                    fs.unlink(current,next);
                }
            })
        }
        next();
    }
    function next(index){
        if(index === arr.length){
            return rmdir(index);
        }
        let current = arr[index++];
        fs.stat(current,function(err,stat){
            if(stat.isDirectory()){
                fs.readdir(current,function(err,files){
                    arr = [...arr,...files.map(file=>{
                        return path.join(current,file)
                    })];
                    next();
                })
            }else{

            }
        })
    }
    next(0);

}
wideAsync('a',function(){
    console.log("删除chengg");
});