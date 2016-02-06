const webpack = require('webpack');

const config = {
  entry: {
    'js/bundle': './example/index.js'
  },
  output: {
    publicPath: '/assets/',
    filename: '[name].js',
    path: './build/assets'
  },
  cache: false,
  debug: true,
  devtool: 'sourcemap',
  devServer: {
    contentBase: './example',
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

module.exports = config;
