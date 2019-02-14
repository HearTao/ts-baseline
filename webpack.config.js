const path = require('path')
const merge = require('webpack-merge')

module.exports.umdConfig = {
  mode: process.env.NODE_ENV || 'development',
  target: 'node',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'tsBaseline',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        resolve: {
          extensions: ['.ts', '.tsx', '.js']
        }
      }
    ]
  }
}

module.exports.standaloneConfig = merge(module.exports.umdConfig, {
  output: {
    filename: 'index.standalone.js'
  },
  externals: {
    typescript: 'ts'
  }
})

module.exports.testConfig = merge(module.exports.umdConfig, {
  entry: './tests/index.ts',
  output: {
    filename: 'test.js'
  }
})
