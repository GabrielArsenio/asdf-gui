const rules = require('./webpack.rules');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

rules.push(
  {
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
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
      'file-loader'
    ]
  }
);

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
