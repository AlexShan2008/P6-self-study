// 分页查询
// 每页3条，查询第2页;跳过3跳数据，每页显示3跳
db.students.find().skip(3).limit(3).sort({ age: 1 });

// 正序
var pageSize = 3;
var pageNumber = 2;

var skipNum = (pageNumber - 1) * pageSize;//跳过多少条数据
var limitSize = pageSize;//每页显示条数

// 按年龄倒序
db.students.find().sort({ age: -1 }).skip(skipNum).limit(limitSize);