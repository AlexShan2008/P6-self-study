# webpack 4 
> 代码转换 
> 文件优化 
> 代码分割 
> 模块合并 
> 自动刷新 
> 代码校验 
> 自动发布

## 依赖
```
--save     || -S (4可以省略了) 项目依赖
--save-dev || -D 开发依赖

```
## 安装webpack 
> 现在不建议全局安装webpack 保证当前项目下 
```
yarn add webpack webpack-cli -g -D

```
## 4. 要求： 添加模式：  可以0配置
> 默认找到src/index.js 支持commonjs和es6模块规范，打包后代码可以直接在浏览器运行。

## npx 用来直接指向node_module/bin文件下cmd命令的指令
 <!-- 8.5以上 自动寻找当前文件下下bin文件夹下的命令 -->
```
npx webpack --mode development 不压缩
npx webpack --mode production  压缩代码

clean-webpack-plugin -D

```
## 5. 模块支持common.js规范

## 6. 多页面开发 webpack.config.js
```
const path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let cleanWebpackPlugin = require('clean-webpack-plugin');//删除上次打包的文件；

module.exports = {
  entry: {
    index: './src/index.js',
    a: './src/a.js'
  },
  output: {
    filename: '[name].[hash:8].js',//8位hash值
    path: path.resolve(__dirname, 'dist') //绝对路径
  },
  module: {
  },//对模块的处理
  plugins: [
    new cleanWebpackPlugin(['dist']),
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