function parse(str) {
  let obj = {};
  let arr = str.split('&');
  arr.forEach(item => {
    let [key, value] = item.split('=');
    obj[key] = value;
  });
  return obj;
}

function stringify(obj) {
  let arr = [];
  for (let key in obj){
    arr.push(key+'='+obj[key]);
  }
  return arr.join('&');
}

exports.parse = parse;
exports.stringify = stringify;