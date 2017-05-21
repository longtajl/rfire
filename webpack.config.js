var path = require('path')

module.exports = {
  entry: './frontend/index.js',
  output: {
      filename: 'bundle.js',
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
          },
          { 
              test: /\.css$/, loader: "./frontend/style.css" 
          },
          {
              test: /\.sass$/,
              loaders: ["style", "css", "sass"]
          }
      ]
  }
};
