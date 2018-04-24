# MongoDB
## 1 定义
- 分布式：开源存储到多个数据库中
> 传统数据库，一般都是单机，无论数据多大，都放在一个数据库中，单机不安全，也不稳定。2T压缩数据

> 数据管家：视频的播放记录，实时记录用户的观看信息，高并发，读写高并发，单机肯定扛不住，爱奇艺主站50台MongoDB服务器，根据ID取模平均分布到不同服务器。

> Tip: 一般不用于核心存储，核心存储一般都用MySQL

> 副本集：异地备份，北京、广州、新疆等各地服务器机房
- 开源
- 文件存储document bson 和json很像，key value 
## 2 安装
- 官网下载免费版
- Mac 1 homebrew   brew install mongodb   //brew 类似于npm
- 配环境变量  bin目录的路径负责到path中，配置以后就可以在电脑中任何位置执行bin文件夹下面的命令 C:\Program Files\MongoDB\Server\3.6\bin
- 添加服务  mongod.exe --dbpath c:\MongoDB\data --logpath c:\MongoDB\log --logappend  --directoryperdb --serviceName mongodb --install
- 删除服务  sc delete mongodb 
 net start mongodb
 net stop mongodb
 - 客户端：bin/ cmd/   mongo 

 **ObejctId**
 - 时间戳
 - 机器
 - pid
 - 优雅关闭数据库
 ```sh
  
 ```
 - save 只区分ID是否相同，不相同就创建
 - upsert= true 更新 插入，不存在，就创建，存在就更新 

```
mongo 1.run.js

load('./1.run.js')
```
## 3 查询
## 3.1 find()
```
db.school.find() //查库
db.students.find({{},{ name:1}}) //查表,{}，查询条件；返回条件：{ name:1 }返回_id和name
db.students.findOne() //查询1条
db.students.find({age:{$in:[20,50]}}); //年龄是20和50的返回
db.students.find({age:{$nin:[20,50]}}); //年龄不是20和50的
db.students.find({age:{$gt:20,$lt:50 }}); //年龄20-50区间不包括20和50
db.students.find({age:{$gte:20,$lte:50 }}); //年龄20-50区间包括20和50
db.students.find({age:{$not: {$gt:20,$lt:50 }}}); //年龄不在20和50区间的

$all $or 
$in $nin $not
$gt $lt $gte $lte

$where:"this.age> 20 && this.age<50"  //万能查询

db.students.find({name:/z.*2/}) //正则匹配，关键字查询

db.students.find()

```
## 3.2 
> 投射，抽出一部分值，构成一个新对象
