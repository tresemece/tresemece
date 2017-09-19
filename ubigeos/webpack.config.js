const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const localport = 8080;

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:' + localport,
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  output: { 
    path: __dirname, 
    filename: 'js/bundle.js' 
  },
  devtool: 'eval-source-map',
  module: {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Ubigeo',
        routeHome: '',
        inject: false,
        template: 'index.html'
      }),
      //new webpack.HotModuleReplacementPlugin(),
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        include: __dirname
      },
    ]
  },
};
