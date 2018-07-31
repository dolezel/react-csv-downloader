const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'js/bundle': './example/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build/assets'),
    publicPath: '/assets/',
    filename: '[name].js',
  },
  devServer: {
    contentBase: './example',
    inline: true,
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
