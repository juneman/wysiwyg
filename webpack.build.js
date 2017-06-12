const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const host = 'localhost';
const port = 8080;

const PROJ_ROOT = __dirname,
      SCRIPTS_DIR = path.join(PROJ_ROOT, 'src'),
      BUILD_DIR = path.join(PROJ_ROOT, 'lib'),
      DIST_DIR = path.join(PROJ_ROOT, 'dist');

module.exports = {
  entry: { index: `${SCRIPTS_DIR}/index` },
  devServer: {host, port, https: true},
  output: {
    path: BUILD_DIR,
    publicPath: `https://${host}:${port}/`,
    library: 'WysiwygEditor',
    libraryTarget: 'var'
  },
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
