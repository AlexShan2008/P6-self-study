# webpack 4 
> webpack就是一个包管理器

*核心功能*
> 1. 代码转换 
> 2. 文件优化 
> 3. 代码分割 
> 4. 模块合并 
> 5. 自动刷新 
> 6. 代码校验 
> 7. 自动发布

## 1. 基本介绍
> 开发依赖: devDependencies

> 发布依赖: Dependencies

### 1.1 安装依赖的方法：
```sh
--save or -S (webpack4 可以不写--save 默认就是安装发布依赖)
--save-dev or -D 开发依赖

```
### 1.2 安装webpack 
> Tips: 不建议全局安装webpack, 保证不同项目各自独立运行，互补影响 
```
yarn add webpack webpack-cli -D

```
### 1.3 webpack4 可以0配置,但是基本不能满足开发需要
> 默认找到src/index.js

### 1.4 npx 
> Node.js 8.5版本以上新增npx命令，主要是用来直接运行项目下node_module/bin文件夹重点cmd命令 

> 自动寻找当前文件下下bin文件夹下的命令

### 1.5 模块引入和导出支持
> 默认支持Commonjs和ES6等模块导入规范，打包后代码可以直接在浏览器运行

### 1.6 webpack4 新增mode功能
> 运行webpack命令时可以直接指定开发环境

```
npx webpack --mode development 不压缩代码
npx webpack --mode production  压缩代码

```
### 1.7 自动清除webpack上次打包生成的文件
```
clean-webpack-plugin -D
```
## 2 常用配置webpack.config.js 

## 6. 多页面开发 webpack.config.js
> 在项目根目录下创建一个webpack.config.js配置文件，webpack会自动寻找最近的配置文件。

*webpack.config.js*
```
const path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');//自动将打包的文件绑定到html文件中；
let cleanWebpackPlugin = require('clean-webpack-plugin');//删除上次打包的相同文件；

module.exports = {
  打包入口文件; 通常为1个或者2个入口文件；
  entry: {
    index: './src/index.js',
    a: './src/a.js'
  },
  output: {
    filename: '[name].[hash:8].js',//[name]根据入口文件名自动命名，[hash:8]将hash值保存，限定8位hash值
    path: path.resolve(__dirname, 'dist') //*一定要：绝对路径
  },
  //对模块的处理
  module: {
    rules:[
      {
        test:/\.(scss|sass)$/,
        use:['style-loader','css-loader','postcss-loader','sass-loader']
      }
    ]
  },
  plugins: [
    new cleanWebpackPlugin(['dist']),//指定文件夹
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks:['index'],
      hash: true,//mdn文件名带md5蹉
      minify: {
        collapseWhitespace: true,//去空格
        removeAttributeQuotes: true//去双引号
      }
    }),
    new htmlWebpackPlugin({
      filename:'a.html',
      template: './src/index.html',
      hash: true,//mdn文件名带md5蹉
      chunks:['a'],
      minify: {
        collapseWhitespace: true,//去空格
        removeAttributeQuotes: true//去双引号
      }
    })
  ], //对应的插件
  devServer: {}//开发服务器的配置

}
```

## 7. 单页面开发 webpack.config.js
```
const path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let cleanWebpackPlugin = require('clean-webpack-plugin');//删除上次打包的文件；

module.exports = {
  // 多入口文件; ['./src/index.js', './src/a.js'] 输出一个bundle.js
  // 单入口文件; './src/index.js' 输出一个bundle.js
  entry: {
    index: './src/index.js',
    a: './src/a.js'
  },
  output: {
    filename: 'bundle.[hash:8].js',//8位hash值
    path: path.resolve(__dirname, 'dist') //绝对路径
  },
  module: {
  },//对模块的处理
  plugins: [
    new cleanWebpackPlugin(['dist']),
    new htmlWebpackPlugin({
      template: './src/index.html',
      hash: true,//mdn文件名带md5蹉
      minify: {
        collapseWhitespace: true,//去空格
        removeAttributeQuotes: true//去双引号
      }
    })
  ], //对应的插件
  devServer: {}//开发服务器的配置

}
```

## 开发服务器,配置热更新，自动打开及刷新页面，并且如果只更改了一个文件，只更改更改的文件
> webpack.HotModuleReplacementPlugin 热更新 

```sh
yarn add webpack-dev-server -D

  devServer: {
    contentBase:'./dist',
    host:'localhost',
    port:3000,
    open: true,
    hot: true, //需要配置一个插件webpack.HotModuleReplacementPlugin
  },

```

### css打包;抽离样式css文件，把多个css文件转成1个，以Link形式引入；style-loader (行内样式引入)  
> yarn add extract-text-webpack-plugin@next -D
> yarn add mini-css-etract-plugin -D

```
yarn add css-loader style-loader -D

  module: {
    rules:[
      {test:/\.css$/,use:ExtractTextPlugin.extract({use:'css-loader'})},
      {test:/\.(scss|sass)$/,use:['style-loader','css-loader','sass-loader']}
    ]
  },

yarn add sass sass-loader node-sass 

postcss  transform:rotate(45deg); -webkit- -md-

yarn add postcss-loader autoprefixer -D
```
### 前端代码模块用ES6模块  import('./index.js')
### 后端代码用common.js   require('./index.js')

## 去掉没有用到的css 
> yarn add purifycss-webpack purify-css -glob -D
```

```