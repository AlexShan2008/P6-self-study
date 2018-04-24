let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    vendor: ['react', 'react-dom']
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: '_dll_[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', '[name].manifest.json')
    })
  ],
  devServer: {
    contentBase: './dist',
    port: 4000,
  }
}
