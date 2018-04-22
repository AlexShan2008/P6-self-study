// 批量插入
var db = connect('school');
var stus = [];
for (var i = 0; i < 1000; i++) {
  stus.push({
    name: 'zfpx' + i,
    age: i
  })
}

db.students.insert(stus);
