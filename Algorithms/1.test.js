function balacne(str) {
    let len = str.length;
    let start = len / 2;
    let result = false;
    let arr1 = [];
    let arr2 = [];
    if (len % 2 !== 0) {
        return result;
    }
    for (let i = 0; i < start; i++) {
        arr1.push(str[i]);
    }
    for (let i = start; i < len; i++) {
        arr2.push(str[i]);
    }
    arr1.reverse();
    console.log(arr1.toString())
    console.log(arr2.toString())
    if (arr1.toString() === arr2.toString()) {
        result = true;
    }
    return result;
}
let res = balacne("[()]");
console.log(res);