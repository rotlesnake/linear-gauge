const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = {
  entry: {
    linear_gauge: path.resolve(__dirname + '/../src/linear-gauge.js'),
  },
  output: {
    path: path.resolve(__dirname + '/../dist/'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'LinearGauge'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname + '/../src'),
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
};

module.exports = [
  baseConfig,
  Object.assign({}, baseConfig, {
    entry: {
      demo: path.resolve(__dirname + '/../src/demo/demo.js'),
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname + '/../src/demo/index.html'),
        inject: true,
      }),
      new FriendlyErrorsPlugin()
    ],
  }),
];
