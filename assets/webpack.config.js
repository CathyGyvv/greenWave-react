const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OpenBrowserPlugin = require('open-browser-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const projectConfig = require('../config')
const DEV = projectConfig.debug

const config = {
  context: __dirname,
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: {
    app: './index.jsx'
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    // path: path.resolve('.package')
    path: path.resolve('build'),
    publicPath: '/app/app-name/assets/'
    // publicPath: '//g.alicdn.com/ET-brain/event-perceiveing/1.0.3/assets/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      components: path.join(__dirname, './components'),
      utils: path.join(__dirname, './utils'),
      styles: path.join(__dirname, './styles'),
      pages: path.join(__dirname, './pages'),
      store: path.join(__dirname, './store')
    }
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

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,

        use: {
          loader: 'babel-loader',

          options: {
            cacheDirectory: true,
            presets: ['env', 'react'],

            plugins: [
              'transform-decorators-legacy',
              'add-module-exports',
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,

        use: {
          loader: 'file-loader',

          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,

        use: {
          loader: 'file-loader',

          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.(less|css)$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',

            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },

  plugins: [

    // 检测打包体积大小
    // new BundleAnalyzerPlugin(),

    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(zh-cn|en-gb)$/),

    new MiniCssExtractPlugin({
      filename: '[name].css'
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

    // new OpenBrowserPlugin({url: 'http://localhost:8001/app/app-name'})
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: module =>
            /[\\/]node_modules[\\/]/.test(module.resource) &&
            module.constructor.name !== 'CssModule',
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
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
      },
      sourceMap: true
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
  config.plugins.push(new webpack.SourceMapDevToolPlugin({
    filename: '[name].js.map',
    exclude: ['vendor.js']
  }))
}

module.exports = config;
