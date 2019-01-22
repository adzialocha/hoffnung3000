const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const APP_FILE_NAME = 'app'
const VENDORS_FILE_NAME = 'lib'

const PATH_SRC = './app'
const PATH_DIST = './public'

const NODE_MODULES_NAME = 'node_modules'

function getPath(filePath) {
  return path.resolve(__dirname, filePath)
}

module.exports = (env, options) => {
  const isDevelopment = (options.mode === 'development')
  const exclude = new RegExp(NODE_MODULES_NAME);

  return {
    entry: {
      [APP_FILE_NAME]: getPath(`${PATH_SRC}/scripts/index.js`),
    },
    output: {
      filename: '[name]-[hash].js',
      path: getPath(PATH_DIST),
    },
    resolve: {
      modules: [NODE_MODULES_NAME],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                indentedSyntax: false,
                sourceMap: isDevelopment,
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: isDevelopment,
        }),
        new OptimizeCssAssetsPlugin(),
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: new RegExp(NODE_MODULES_NAME),
            chunks: 'all',
            name: VENDORS_FILE_NAME,
          },
        },
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
      }),
    ],
  }
}
