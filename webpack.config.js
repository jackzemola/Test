const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx'
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
          presets: ['react', 'es2015', 'stage-0']
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: 'post.config.js'
          }
        }
      }]

    }, {
      test: /\.less$/,
      use: [
        {loader: 'style-loader'},
        {loader: 'css-loader', options: {
          sourceMap: true, modules: true,
          localIdentName: '[local]_[hash:base64:5]'
        }},
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: 'postcss.config.js'
            }
          }
        },
        {
          loader: 'less-loader', options: { sourceMap: true }
        }
      ]
    }, {
      test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      use: 'url-loader'
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, '.', 'src')
    }
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      template: './index.html',
      filename: './index.html'
    })
  ],
  devServer: {
    contentBase: './',
    hot: true,
    historyApiFallback: true
  }
};