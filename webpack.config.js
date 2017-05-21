var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path')

module.exports = {
  entry: './frontend/index.js',
  output: {
      filename: 'js/bundle.js',
      path: path.resolve(__dirname, 'static')
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
          },
          { 
              test: /\.css$/, loader: "./frontend/style.css" 
          },
          {
              test: /\.sass$/,
              loaders: ["style", "css", "sass"]
          }
      ]
  },
  plugins: [
      new CopyWebpackPlugin([
          { from: 'node_modules/material-design-lite/material.min.css', to: 'css/material.min.css' },
          { from: 'node_modules/material-design-lite/material.min.js', to: 'js/material.min.js' }
      ])
  ]
}

