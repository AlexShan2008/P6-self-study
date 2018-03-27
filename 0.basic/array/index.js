let array = [1, 2, 3, 4, 5, 6];
let start = 0;
let end = 3;
let temp = 100;
// 截取数组；
let subArray = array.slice(start, end);//创建新数组；
console.log(subArray);//[1, 2, 3] 

// 铰接；
// 删除现有元素和/或添加新元素
// array.splice(start, deleteCount, item1, item2, ...)deleteCount为0是就是添加元素；
// 返回值：由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。
let spliceArray = array.splice(start, 2, [8, 8]);
console.log(array);//[Array(2), 3, 4, 5, 6]
console.log("spliceArray", array);//[Array(2), 3, 4, 5, 6]


// 数组反转；
let reverseArray = array.reverse();//把原数组反转，并返回；不会创建新数组；
console.log(reverseArray);//[6, 5, 4, 3, 2, 1]
console.log(array);//[6, 5, 4, 3, 2, 1]

// 末尾：追加元素；返回新的长度
let newLength = array.push(temp);
console.log(newLength); //7

// 末尾：删除元素；返回删除的元素
let popArray = array.pop(temp);
console.log(popArray); //100

// 头部：追加元素；返回新的长度
let newLength2 = array.unshift(temp);
console.log(newLength2); //7

// 头部：删除元素；返回删除的元素
let shiftArray = array.shift(temp);
console.log(shiftArray); //100

let arr = [1, 2, 3, 4, 5, 6];

// 遍历数组；
// forEach() 方法对数组的每个元素执行一次提供的函数。
// 应用场景：为一些相同的元素，绑定事件处理器！
arr.forEach((value, index, array) => {
    // value 值
    // index 索引 
    // array 当前数组
    console.log('value', value);
    console.log('index', index);
    console.log('array', array);
})

// 遍历数组,并添加操控条件；
// map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
let arr1 = [1, 2, 3, 4, 5];
let double = arr1.map((currentValue, index, array) => {
    return currentValue * 2;
})
console.log(double);//[ 2, 4, 6, 8, 10 ]


// reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
let arr1 = [1, 2, 3, 4, 5];
let sum = arr1.reduce((accumulator, currentValue) => {
    console.log(accumulator);//1 3 6 10 15
    return accumulator + currentValue;
})
console.log(sum); //15


// 转换成字符串；不会改变数组！
// join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。
let old = [1, 2, 3, 4];
let arr = old.join('-');
console.log(old); //[ 1, 2, 3, 4 ]
console.log(arr); //1-2-3-4

// concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];

console.log(array1.concat(array2));
// expected output: Array ["a", "b", "c", "d", "e", "f"]


// indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
// arr.indexOf(searchElement)
// arr.indexOf(searchElement[, fromIndex = 0])
// searchElement要查找的元素
// fromIndex 开始查找的位置。

// 数组排序sort
// 默认排序顺序是根据字符串Unicode码点。
var fruit = ['cherries', 'apples', 'bananas'];
fruit.sort();
// ['apples', 'bananas', 'cherries']

var scores = [1, 10, 21, 2];
scores.sort();
// [1, 10, 2, 21]
// 注意10在2之前,
// 因为在 Unicode 指针顺序中"10"在"2"之前

var things = ['word', 'Word', '1 Word', '2 Words'];
things.sort();
// ['1 Word', '2 Words', 'Word', 'word']
// 在Unicode中, 数字在大写字母之前,
// 大写字母在小写字母之前.

// 从小到大排序；升序；
var numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
console.log(numbers);

// [1, 2, 3, 4, 5]


// ES6新增方法；

// findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

