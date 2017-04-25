import path from 'path'

export default {
  devtool: 'eval',
  entry: {
    app: './app/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public', 'scripts'),
    filename: 'app.js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'app'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  devServer: {
    port: 3000,
  },
}
