/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../dist'),
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/\\.netlify/functions': '',
        },
      },
    },
  },
});
