const path = require('path');
const host = 'localhost';
const port = 8080;
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PROJ_ROOT = __dirname,
      SCRIPTS_DIR = path.join(PROJ_ROOT, 'src'),
      BUILD_DIR = path.join(PROJ_ROOT, 'lib');

const baseConfig = {
  entry: { index: `${SCRIPTS_DIR}/index` },
  devServer: {host, port, https: true},
  output: {
    path: BUILD_DIR,
    publicPath: `https://${host}:${port}/`,
    library: 'WysiwygEditor',
    libraryTarget: 'var',
    filename: 'bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CopyWebpackPlugin([
      { from: `${ PROJ_ROOT }/package.json` }
    ])
  ],
  resolve: {
    modules: [
      SCRIPTS_DIR,
      `${PROJ_ROOT}/node_modules`
    ],
    extensions: ['.js', '.json']
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};

if (process.env.NODE_ENV != 'development') {
  baseConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false
      }
    })
  );
}

module.exports = baseConfig;
