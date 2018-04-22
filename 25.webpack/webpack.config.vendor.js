const path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let cleanWebpackPlugin = require('clean-webpack-plugin');//删除上次打包的文件；
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let PurifyCss = require('purifycss-webpack');//去掉多余css，没有使用的css代码
let Glob = require('glob');//搜索引用；
let isDev = process.NODE_ENV === 'development';
let publicPath = isDev === 'development' ? 'http://localhost:8080/' : '/';//CDN代码网站

module.exports = {
  entry: {
    vender: ['react', 'react-dom'] //打包第三方插件 
  },
  output: {
    filename: '[name].[hash:8].js',//8位hash值
    path: path.resolve(__dirname, 'dist'), //绝对路径
    library: '_dll_[name]',
    publicPath: publicPath,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {//先抽离第三方插件
          test: '/node_modules/',
          chunks: 'initial',//初始化时进行打包
          name: 'vendor',
          priority: 10 //优先级 数越大，优先越高
        },
        commons: {
          chunks: 'initial',
          name: 'commons',
          minSize: 0 //只要超出0字节就生成新包
        }
      }
    }
  },
  //对模块的处理
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: '/node_modules/',
        include: path.resolve(__dirname, 'src'),//绝对路径
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css')
    },
    extensions: [' ', '.js', '.json', '.css'],
    modules: ['node_modules', 'lib']//模板的引用，先去node_modules下寻找，找不到就去lib文件夹下寻找,
  },
  //对应的插件
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', '[name].manifest.json')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'css/index.css',
      disable: isDev
    }),
    new PurifyCss({
      paths: Glob.sync(path.join(__dirname, 'src/*.html'))
    }),
    new webpack.DllReferencePlugin({
      manifest: path.join(__dirname, 'dist', 'vendor.manifest.json')
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['vendor', 'index'],
      hash: true,//mdn文件名带md5蹉
      minify: {
        collapseWhitespace: true,//去空格
        removeAttributeQuotes: true//去双引号
      }
    }),
    new htmlWebpackPlugin({
      filename: 'a.html',
      template: './src/index.html',
      hash: true,//mdn文件名带md5蹉
      chunks: ['vendor', 'a'],
      minify: {
        collapseWhitespace: true,//去空格
        removeAttributeQuotes: true//去双引号
      }
    })
  ],
  //开发服务器的配置,启动静态服务器
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true, //需要配置一个插件webpack.HotModuleReplacementPlugin
  },
  mode: 'development'
}