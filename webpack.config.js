const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  context: __dirname,
  entry: ['./javascripts/index.js', './stylesheets/manifest.sss'],
  // js: './javascripts/index.js'
  // styles: './stylesheets/index.js'
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].bundle.js',
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
              name: '[path][name].[ext]?[hash:base64]'
            }
          }
        ]
      },
      { test: /\.pug$/, loader: 'pug-loader' }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, './node_modules')],
    extensions: ['.js', '.sss', '.css']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'Custom template using Handlebars',
    //   template: 'index.pug'
    // }),
    new HtmlWebpackPlugin({
      title: 'My App Name',
      template: 'index.pug',
      hash: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}

if (NODE_ENV === 'development') {
  module.exports.module.rules.push(
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.sss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.resolve(__dirname, './postcss.config.js')
            }
          }
        }
      ]
    }
  )

  // module.exports.devServer = {
  //   host: 'localhost',
  //   proxy: {
  //     '*': 'http://localhost:5000'
  //   },
  //   port: 8080,
  //   historyApiFallback: true,
  //   hot: true
  // }
  module.exports.devServer = {
    contentBase: 'public',
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8080,
    host: 'localhost'
  }
} else if (NODE_ENV === 'production') {
  module.exports.output.filename = '[name]-[chunkhash].bundle.js'
  module.exports.output.chunkFilename = '[id]-[chunkhash].bundle.js'
  module.exports.output.publicPath = './'
  module.exports.module.rules.push(
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: { minimize: true }
          }
        ]
      })
    },
    {
      test: /\.sss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, './postcss.config.js')
              }
            }
          }
        ]
      })
    }
  )

  module.exports.plugins.push(
    new UglifyJSPlugin(),
    new ExtractTextPlugin({
      filename: 'stylesheets/[name].bundle.[chunkhash].css',
      allChunks: true
    })
  )
}
