const webpack = require('webpack');

// Nodejs Modules
const path = require('path');
const fs = require('fs');

// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SourceMapWebpackPlugin = require('./configurations/source-map-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');

/**
 * @type {Configuration}
 */
module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  plugins: [
    // new CopyPlugin([{ from: './src/manifest.txt', to: './' }]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new SourceMapWebpackPlugin(),
    new ExtractTextWebpackPlugin('style.css')
  ],
  devServer: {
    https: true
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      // Local Styles
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
        // include: fs.realpathSync('./src/assets/css')
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: fs.realpathSync('./src/assets/css')
      },
      // // Global Styles
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextWebpackPlugin.extract({
      //     use: ['css-loader', 'sass-loader']
      //   }),
      //   exclude: fs.realpathSync('./src/Components/')
      // },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextWebpackPlugin.extract({
      //     use: ['css-loader']
      //   }),
      //   exclude: fs.realpathSync('./src/Components/')
      // },
      // Images
      {
        test: /\.(jpe?g|gif|png|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40000
            }
          },
          'image-webpack-loader'
        ]
      }
    ]
  }
};
