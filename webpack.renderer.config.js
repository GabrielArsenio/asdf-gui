const rules = require('./webpack.rules');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

rules.push({
  test: /\.css$/,
  use: [
    'vue-style-loader',
    'style-loader',
    'css-loader'
  ],
},
{
  test: /\.vue$/,
  loader: 'vue-loader'
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
