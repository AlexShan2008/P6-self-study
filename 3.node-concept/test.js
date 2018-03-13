// 执行上下文栈；作用域；

function one(params) {
    let a = 1;
    two();
    function two(params) {
        function three(params) {
            console.log(params);
        }
    }
}

one(2);

