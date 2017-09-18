const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
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
      })
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
