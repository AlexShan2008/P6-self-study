var db = connect('school');
for (var i = 0; i < 1000; i++) {
  db.students.insert({
    name: 'zfpx' + i,
    age: i
  })
}