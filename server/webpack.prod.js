const path = require('node:path')

const tsConfigFile = path.join(__dirname, './tsconfig.json')

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
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
        options: {
          configFile: tsConfigFile
        }
      }
    },
    {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env'
          ]
        ]
      }
    }]
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.png', '.jpg', '.ts', '.tsx', '.json', '.cjs', '.mjs']
  }
}
