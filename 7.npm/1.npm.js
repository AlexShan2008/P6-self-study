// npm node package manager

// http-server 
// anywhere
// npm库，将我们的包上传到网上

// 第三方模块，下载的模块
// 引用方式不需要加./ 引的就是module.paths

// 安装 卸载 发布 
// 1.进入在文件夹目录， 在cmd命令行工具运行npm init  -y (可选)  
// npm init -y (初始化npm 包  -y省去包的基本参数的设置：tips:当前文件不能有中文，特殊字符串，不能用要安装的模块来命名)
// package.json中不能有注释 不能有多余的表达符号

// 没有初始化，记录依赖的功能就没了
// 默认会区分开发环境
// 开发依赖 webpack  babel  --save-dev  (-D)
// 项目依赖 react redux --save (默认就是-S)

// 2.安装
// npm install jquery@2.2.2 //  @2.2.2 指定版本号
// npm info jquery 查询jquery的版本
// npm install babel-core --dev
// npm uninstall babel - core--dev 卸载包 


// 3.安装所有包依赖  npm install 
// 服务器只安装 --production 不安装开发依赖，只安装项目依赖；


// yarn全局命名 
// 全局命令 命令行下用
// npm install -g yarn    //安装到
// npm root -g //查询全局命令的位置 C:\Users\ShanGuo\AppData\Roaming\npm\node_modules
// 如果是Mac需要加前面加sudo 
// yarn init -y
// yarn add filename@2.2.2 --dev 
// yarn remove filename 
// yarn install 安装全部依赖

// npm的配置文件.npmrc  可以更改下载来源registry  下来文件的保存的位置prefix
// npm config list 
// prefix 
// npm config set prefix c: 安装路径，保存到C盘

// npm install nrm -g
// nrm use taobao
// 


// 全局安装
// 发布包
// 通过命令行来实现
// 创建NPM账号
// npm adduser 如果有就登录，没有就注册
// 账号只能在官方登录  npm环境下安装 
// 包一定要有package.json
// name 一定要唯一
// 舒服用户名  邮箱和邮箱密码
// npm publish  发布包
// npm unpublish  删除发布包

