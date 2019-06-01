const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './animation-player/src/app.js',
  output: {
    filename: './animation-player/app.js',
    path: path.resolve(__dirname, 'animation-player/dist'),
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.sass$/, use: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader']) },
      { test: /\.js$/, exclude: /(node_modules)/, use: { loader: 'babel-loader' } },
      { test: /\.(gif|png|jpe?g|svg)$/, use: { loader: 'file-loader', options: {} } },
      // eslint-disable-next-line max-len
      // { test: /\.(gif|png|jpe?g|svg)$/i, use: { loader: 'image-webpack-loader', options: { disable: true } } },
    ],
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new HtmlWebpackPlugin({ template: './animation-player/src/assets/index.html' }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ],
      },
    }),
  ],
};
