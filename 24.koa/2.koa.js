// use中间件原理的简单实现；

let fn1= (ctx, next) => {
    console.log(1);
    next();
    console.log(2);
};
let fn2 = (ctx, next) => {
    console.log(3);
    next();
    console.log(4);
};
let fn3 = (ctx, next) => {
    console.log(5);
    next();
    console.log(6);
};

let fns = [fn1, fn2, fn3];
function dispatch(index){
    let middle = fns[index];
    if(fns.length === index) return ()=>{}
    middle({},()=> dispatch(index+1))
}
dispatch(0);