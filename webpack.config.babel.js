import path from 'path'

import AssetsPlugin from 'assets-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

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
  const exclude = new RegExp(NODE_MODULES_NAME)

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
          enforce: 'pre',
          loader: 'eslint-loader',
        },
        {
          test: /\.js$/,
          exclude,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          exclude,
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
                sassOptions: {
                  outputStyle: isDevelopment ? 'nested' : 'compressed',
                },
                sourceMap: isDevelopment,
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
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
      new CopyPlugin({
        patterns: [{
          flatten: true,
          from: getPath(`${PATH_SRC}/images/*`),
          to: getPath(PATH_DIST),
        }],
      }),
      new MiniCssExtractPlugin({
        filename: `${filename}.css`,
      }),
    ],
  }
}
