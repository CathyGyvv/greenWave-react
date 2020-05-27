// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
// const cwd = process.cwd()
const projectConfig = require('../config')
const DEV = projectConfig.debug

const config = {
  context: __dirname,
  // entry: `${cwd}/index`,
  output: {
    path: path.resolve('build'),
    publicPath: '/app/app-name/assets/',
    // publicPath: '//g.alicdn.com/ET-brain/event-perceiveing/1.0.3/assets/',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:5].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.join(__dirname, './components'),
      utils: path.join(__dirname, './utils'),
      styles: path.join(__dirname, './styles'),
      pages: path.join(__dirname, './pages'),
      store: path.join(__dirname, './store')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.scss/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     // resolve-url-loader may be chained before sass-loader if necessary
      //     use: ['css-loader', 'sass-loader']
      //   })
      // },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images/'
            // publicPath: '//g-assets.daily.taobao.net/ET-brain/event-perceiveing/1.0.2/assets/'
            // publicPath: '//g.alicdn.com/ET-brain/event-perceiveing/1.0.3/assets/'
          }
        }
      },
      {
        test: /\.(eot|ttf|woff)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: ''
            // publicPath: '//g-assets.daily.taobao.net/ET-brain/event-perceiveing/1.0.2/assets/fonts/numfont/'
            // publicPath: '//g.alicdn.com/ET-brain/event-perceiveing/1.0.3/assets/fonts/numfont/'
          }
        }
      }
    ]
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'leaflet': 'L',
    'react-leaflet': 'ReactLeaflet',
    'lodash': '_',
    'd3': 'd3',
    '@antv/data-set': 'DataSet',
    // '@alife/next': 'Next',
    // 'gas.gl': 'Gas',
    // 'bizcharts': 'BizCharts',
    'intl': 'Intl'
  },

  plugins: [

    // 检测打包体积大小
    // new BundleAnalyzerPlugin(),

    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(zh-cn|en-gb)$/),

    // new ExtractTextPlugin({
    //   filename: '[name].bundle.css',
    //   allChunks: true
    // }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    // 允许错误不打断程序
    new webpack.NoEmitOnErrorsPlugin(),
    // 进度插件
    new webpack.ProgressPlugin((percentage, msg) => {
      const stream = process.stderr
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0)
        stream.write(`📦   ${msg}`)
        stream.clearLine(1)
      }
    }),
    // 环境变量定义
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(DEV ? 'development' : 'production')
      },
      __DEV__: JSON.stringify(JSON.parse(DEV ? 'true' : 'false'))
    }),

    new OpenBrowserPlugin({url: 'http://localhost:8001/app/app-name'})
  ]
}

// 发布状态
if (!DEV) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      mangle: {
        except: ['$', 'exports', 'require']
      },
      output: {
        ascii_only: true,
        comments: false
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.bundle\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  )
} else {
  config.devServer = {
    headers: { 'Access-Control-Allow-Origin': '*' },
    'Access-Control-Allow-Credentials': 'true'
  }
  config.plugins.push(new webpack.SourceMapDevToolPlugin({}))
}

module.exports = config
