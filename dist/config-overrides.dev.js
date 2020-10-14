"use strict";

var path = require('path');

module.exports = function override(config, env) {
  config["resolve"] = {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      css: path.resolve(__dirname, 'src/assets/css/'),
      img: path.resolve(__dirname, 'src/assets/img'),
      js: path.resolve(__dirname, 'src/assets/js'),
      lib: path.resolve(__dirname, 'src/assets/lib'),
      views: path.resolve(__dirname, 'src/views/'),
      api: path.resolve(__dirname, 'src/api')
    },
    extensions: ['.js']
  };
  return config;
};