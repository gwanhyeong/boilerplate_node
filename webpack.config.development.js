const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'development',
  watchOptions: {
    ignored: ['node_modules/**'],
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, '/dist'),
    port: process.env.PORT || 8080,
    hot: true,
    inline: true,
    overlay: true,
  },
});
