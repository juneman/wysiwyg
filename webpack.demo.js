const baseConfig = require("./webpack.build");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const demoConfig = Object.assign({}, baseConfig, {
  plugins: [
    ...baseConfig.plugins,
    new CopyWebpackPlugin([
      {from: `${__dirname}/node_modules/react/umd`, to: 'lib/react'},
      {from: `${__dirname}/node_modules/react-dom/umd`, to: 'lib/react-dom'}
    ])
  ]
});

module.exports = demoConfig;