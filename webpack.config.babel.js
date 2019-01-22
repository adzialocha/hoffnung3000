import path from 'path'

import AssetsPlugin from 'assets-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

const APP_FILE_NAME = 'app'
const VENDORS_FILE_NAME = 'lib'

const PATH_SRC = './app'
const PATH_DIST = './static'

const NODE_MODULES_NAME = 'node_modules'

function getPath(filePath) {
  return path.resolve(__dirname, filePath)
}

module.exports = (env, options) => {
  const isDevelopment = (options.mode === 'development')
  const filename = isDevelopment ? '[name]' : '[name]-[contenthash:4]'
  const exclude = new RegExp(NODE_MODULES_NAME);

  return {
    entry: {
      [APP_FILE_NAME]: getPath(`${PATH_SRC}/scripts/index.js`),
    },
    output: {
      filename: `${filename}.js`,
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
    devtool: isDevelopment ? 'cheap-module-source-map' : undefined,
    plugins: [
      new AssetsPlugin(),
      new MiniCssExtractPlugin({
        filename: `${filename}.css`,
      }),
    ],
  }
}
