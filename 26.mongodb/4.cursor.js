var db = connect('school');//指定连接的数据库
var cursor = db.students.find();//返回的是游标，指针，指向结果集的一个指针；并不会真正返回数据。

// method 1
// if (cursor.hasNext()) {
//   // 数据库数据还没读取完
//   var record = cursor.next();
// } else {
//   // 数据库数据读完了
// }

// method 2
// while (cursor.hasNext()) {
//   var record = cursor.next();
// }

// method 3
cursor.forEach(function (item) {
  console.log(item)
});