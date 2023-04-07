const path = require('path');

module.exports = {
  mode: 'production',

  entry: {
    path: path.resolve(__dirname, 'src/index.js'),

  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mainModule.js',
  },

};