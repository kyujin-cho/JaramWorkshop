module.exports = [
  {
    entry : ['babel-polyfill', './react/posts.js'],
    output: {
      path: __dirname + '/public/js',
      filename: 'posts.js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/',
          query: {
            cacheDirectory: true,
            presets: ['env', 'react']
          }
        }
      ]
    }
  }, {
    entry : ['babel-polyfill', './react/post.js'],
    output: {
      path: __dirname + '/public/js',
      filename: 'post.js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/',
          query: {
            cacheDirectory: true,
            presets: ['env', 'react']
          }
        }
      ]
    }
  }
]