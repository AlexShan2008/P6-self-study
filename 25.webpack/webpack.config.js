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
  // 多入口文件; ['./src/index.js', './src/a.js'] 输入一个bundle.js
  // 多页面开发;{ index: './src/index.js', a: './src/a.js' } 打包多个文件名 filename: '[name].[hash:8].js',//4位hash值
  entry: {
    index: './src/index.js',
    a: './src/a.js',
  },
  output: {
    filename: '[name].[hash:8].js',//8位hash值
    // filename: 'bundle.[hash:8].js',//8位hash值
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
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5, //大于5自己，调用file-loader，生成图片，否则生成base64数据
            outputPath: 'images/'
          }
        }]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          }]
        })
      },
      {
        test: /jquery/,
        use: [
          {
            loader: 'expose-loader',
            options: '$'
          }
        ]
      }
      // {
      //   test:/\.(scss|sass)$/,
      //   use:ExtractTextPlugin.extract({
      //     use:['style-loader','css-loader','postcss-loader','sass-loader']
      //   })
      // }
      // {test:/\.(scss|sass)$/,use:['style-loader','css-loader','postcss-loader','sass-loader']}
    ]
  },
  resolve: {
    alias: {
      'bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css')
    },
    extensions: [' ', '.js', '.json', '.css'],
    modules: ['node_modules', 'lib']//模板的引用，先去node_modules下寻找，找不到就去lib文件夹下寻找,
    // mainFileds:['b']
  },
  //对应的插件
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'//全局变量$ 代表jquery
    }),
    // new cleanWebpackPlugin(['dist']),
    new webpack.DllPlugin({
      // DllPlugin
      // 动态链接库 写代码时 会编译打包 我们有很多的第三方包
      // 先打好包
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', '[name].manifest.json')
    }),
    new CopyWebpackPlugin([{ //拷贝静态资源
      from: './src/doc',
      to: 'public'
    }]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // 注入全局名称
      __DEV__: isDev
    }),
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
