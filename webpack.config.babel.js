import dotenv from 'dotenv'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'

dotenv.config()

const extractStylesheet = new ExtractTextPlugin({
  filename: 'styles/app.css',
})

export default {
  devtool: 'eval',
  entry: {
    app: './app/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'scripts/app.js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }],
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: extractStylesheet.extract({
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      }),
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'app'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  plugins: [
    extractStylesheet,
  ],
}
