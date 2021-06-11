const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const paths = require('./utils/paths');

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development';
  const prodMode = argv.mode === 'production';

  return {
    target: 'node',
    mode: prodMode ? 'production' : devMode && 'development',
    devtool: prodMode ? false : devMode && 'cheap-module-source-map',
    context: paths.srcPath,
    externals: [nodeExternals()],
    entry: [
      '@babel/polyfill',
      paths.entryPath
    ],
    output: {
      path: prodMode ? paths.distPath : undefined,
      filename: prodMode
        ? '[name].[contenthash:8].js'
        : devMode && 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
};
