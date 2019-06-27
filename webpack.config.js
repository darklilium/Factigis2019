const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  context: __dirname,
  //devtool: 'inline-source-map',
  entry: {
    //put ur bundle files here.
         login: './static/js/bundles/login.js',
         factigisDashboard: './static/js/bundles/factigisDashboard.js',
         factigisFrontoffice: './static/js/bundles/factigisFrontoffice.js',
         factigisCarta: './static/js/bundles/factigisCarta.js',
         factigisBackoffice: './static/js/bundles/factigisBackoffice.js',
         factigisBackoffice2: './static/js/bundles/factigisBackoffice2.js',
         //22.05.2018: se agregan dos módulos - sgo y vys para nuevo flujo de factigis
         factigis_sgo: './static/js/bundles/factigis_sgo.js',
         factigis_vys: './static/js/bundles/factigis_vys.js',
         factigisCertificado: './static/js/bundles/factigisCertificado.js',
    vendor: [

    ]
  },
  output: {
    path: path.join(path.join(__dirname, 'dist'), 'js'),
    filename: '[name].js',
    libraryTarget: "amd",
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.scss', '.css', '.js', '.json','.webpack.js', '.web.js', '.js', '.jsx'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: { presets: ['es2015', 'stage-0', 'react','stage-2'] }
      }, {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
      }
    ]
  },
  externals: [
      function(context, request, callback) {
          if (/^dojo/.test(request) ||
              /^dojox/.test(request) ||
              /^dijit/.test(request) ||
              /^esri/.test(request)
          ) {
              return callback(null, "amd " + request);
          }
          callback();
      }
  ],
  devServer: {
    inline: true,
    port: 443,
    host: "127.0.0.1",
    historyApiFallback: true
  },
  devtool: 'source-map',
  postcss: [autoprefixer],
  sassLoader: {
    data: '@import "libs/index.scss";',
    includePaths: [path.resolve(__dirname, './static/css')]
  },
  plugins: [
    new ExtractTextPlugin('../css/style.css', { allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
