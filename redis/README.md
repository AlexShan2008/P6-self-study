# 数据库

## 1 `mySQL` 关系型数据库，存的表，表里存的记录行 磁盘数据库，性能可靠Oracal 

## 2 `mongodb` 非关系型数据库 存的集合，集合里存放的是文档，可靠性不高，可能丢数据

## 3 `redis` 内存数据库 速度最快，读11万次/s，写8.1万次/s 功能单一，{key:value} mySQL 1000次/s

**用途**
- 1. 会话服务器，集中式会话管理
- 2. 缓存服务器，高并发（百度首页，微博，新闻页），第一次从服务器读取，然后存在Redis数据库中，后来的用户从缓存读取，缓存设置时长（30min,半小时读一次数据库,mySQL不支持高并发，很容易宕机）
- 3. 标签云（每个标签不重名）

> 应用场景：
>
> 服务器 （如何解决session？集中存储session，保证不同服务器共有一个会话）
Redis(一个数据库，要求1.读写超级快；2.可靠)     
     nginx 

应用服务器集群

## 1.1 安装`redis`
[Windows下载地址：](https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip)
## 1.2 启动`redis`
```
//启动server
redis-server redis.windows.conf

//启动client
redis-cli -h 127.0.0.1 -p 6379

config get port 

```
## 常用命令及存储的数据类型
## 建议命令用英文大写

### 1. 键值对
```
set age 1
get age
getrange 1 2 
incr age 1 +
decr age 1 -

exists age // 1 存在 0 不存在
del age 
<!-- 缓存 -->
set homepage index.html
get homepage
expire homepage 10  //10s后过期
ttl homepage //time to live  还有多久过期？过期会自动删除

set name 1
type name  // string 获取key的属性类型 
```

### 2. 哈希值
```
hset user name zfpx  //hash set key name zfpx
hset user age 9      //hash set key age 9
hget user name // zfpx
hget user age //9
hgetall user // name zfpx age 9

hmset user gender man home beijing //同时设置多条key和value
hget all user

hdel user name //del user name 
hkeys user //拿到所有属性 -》再通过所有属性活动对应的value
```

### 3. 列表List
> 查询和读取很慢，需要遍历才能找到索引和值
> 插入和删除很快，只需改变指针即可
```
lpush ids 2 //左端插入2
rpush ids 3 //列表右端插入3

lrange ids 0 -1 //全部 0最左  -1 最右 左右闭区间

lpop ids // 删除左侧第一个 并返回删除的元素 
rpop ids // 删除右侧第一个 并返回删除的元素 

lindex ids 1 //根据索引查询
LLEN ids //长度

LPUSH myid 1 
LREM  myid 0 1//删除值为1元素，0表示全部
LREM  myid 2 1 //删除2个值为1的元素，从左向右查找 
LREM  myid -2 1 //从右往左删，删除2个值为1
```

### 3. 集合 Set
无重复项
> 标签云
```
SADD tags 1
SADD tags 2
SADD tags 3

SMEMBERS tags //查看所有成员
SCARD tags //长度

SREM tags 2 // 删除 值为2的tags


```

