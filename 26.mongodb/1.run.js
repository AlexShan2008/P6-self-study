var commond = {
  // 要操作的集合
  findAndModify: 'students',
  // 查询条件，指定操作的集合的范围
  query: {name: 'shanguo'},
  // 指定如何更新，就是把年龄加100
  update: {$set: {age: 100}},
  // 指定返回的字段 age: 1和true 返回，0 或者false不返回，_id: 默认true 
  fields: {age: 1, _id: 0},
  // 是否排序,按age升序排列 
  sort: {age:1},
  // 返回更新后的文档
  new : true
}

var db = connect('school');
var result = db.runCommand(commond);
printjson(result);

