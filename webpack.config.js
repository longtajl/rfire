const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path')

module.exports = [{
  entry: {
      bundle: './frontend/index.js',
  },
  output: {
      filename: 'build.js',
      path: path.resolve(__dirname, 'static/js')
  },
  module: {
      loaders: [
          {
              loader: 'babel-loader',
              exclude: /node_modules/,
              test: /\.js[x]?$/,
              query: {
                  cacheDirectory: true,
                  presets: ['react', 'es2015']
              }
          }
      ]
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: 'node_modules/material-design-lite/material.min.js', to: 'material.min.js' } ])
  ]
},{
    entry: {
        common: './frontend/scss/common.scss'
    },
    output: {
      filename: '[name].css',
      path: path.resolve(__dirname, 'static/css/')
    },
    module: {
        loaders: [
          { 
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({ 
              fallback: 'style-loader', 
              use: [ { loader : 'css-loader' }, { loader : 'sass-loader' }]
            })
          }
        ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      new CopyWebpackPlugin([
          { from: 'node_modules/material-design-lite/material.min.css', to: 'material.min.css' },
          { from: 'node_modules/normalize.css/normalize.css', to: 'normalize.css' }
      ])
    ]
}]
