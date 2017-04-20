const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.noDeprecation = true;
const rootDir = path.resolve(__dirname, '../');
const configDir = path.resolve(__dirname, '../config/config.dev.json');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].[chunkhash].map'
  },
  resolve: {
    modules: [
      path.resolve(rootDir, 'src'),
      path.resolve(rootDir, 'node_modules')
    ]
  },
  devServer: {
    contentBase: path.resolve(rootDir, 'dist'),
    historyApiFallback: true,
    port: 10000,
    host: '0.0.0.0',
    inline: true,
    compress: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new ExtractTextPlugin({
      filename: "[name].bundle.css",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  externals: {
    /* eslint-disable import/no-dynamic-require */
    'Config': JSON.stringify(require(configDir))
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: 'eslint-loader',
        exclude: [ /node_modules/, /dist/ ]
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: [ /node_modules/ ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('postcss-import'),
                  require('autoprefixer')
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        use: [{
          loader: 'url-loader',
          options: { 
            limit: 10000,
            name: '[name].[ext]'
          }
        }]
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: '[name].[ext]'
          }
        }]
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: '[name].[ext]'
          }
        }]
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
            name: '[name].[ext]'
          }
        }]
      }, 
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
            name: '[name].[ext]'
          }
        }]
      }, 
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  }
};