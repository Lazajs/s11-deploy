const path = require('node:path')

module.exports = {
  target: 'node',
  entry: './src/index.ts',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/
    },
    {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: '8.10'
              }
            }
          ]
        ]
      }
    }]
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  }
}
