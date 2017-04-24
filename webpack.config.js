const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')
const WebpackBabiliPlugin = require('babili-webpack-plugin')
const WebpackCleanPlugin = require('clean-webpack-plugin')
const WebpackNodeExternalsPlugin = require('webpack-node-externals')

const BUILD = path.resolve(__dirname, 'build')
const SRC = path.resolve(__dirname, 'src')
const PRODUCTION = process.env.NODE_ENV === 'production'

const {
  access_key_id: ACCESS_KEY_ID
  secret_access_key: SECRET_ACCESS_KEY
} = require('./aws-credentials.json')

let plugins = []

if (PRODUCTION) {
  plugins.push(
    new WebpackCleanPlugin([BUILD]),
    new webpack.DefinePlugin(_.mapValues({
      'process.env.AWS_ACCESS_KEY_ID': ACCESS_KEY_ID,
      'process.env.AWS_SECRET_ACCESS_KEY': SECRET_ACCESS_KEY
    }, JSON.stringify))
    new WebpackBabiliPlugin()
  )
}

module.exports = {
  context: SRC,
  devtool: PRODUCTION ? false : 'eval-source-map',
  entry: {
    api: './api',
  },
  externals: [WebpackNodeExternalsPlugin()],
  module: {
    rules: [{
      test: /\.json$/,
      use: ['json-loader']
    }, {
      exclude: /node_modules/,
      test: /\.js$/,
      use: ['babel-loader']
    }]
  },
  output: {
    filename: '[name].js',
    path: BUILD
  },
  plugins: plugins,
  target: 'node'
}
