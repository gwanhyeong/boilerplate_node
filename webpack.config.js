const path = require('path');
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.png$|\.jpg$|\.gif$/,
        loader: 'file-loader',
      },
      {
        test: /\.css$|\.scss$|\.sass$/,
        loader: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new WatchExternalFilesPlugin({
      files: ['./src/**/*.js'],
    }),
  ],
};
