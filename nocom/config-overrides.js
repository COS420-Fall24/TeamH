const path = require('path');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "fs": false,
    "path": require.resolve("path-browserify"),
    "crypto": require.resolve("crypto-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "buffer": require.resolve("buffer/"),
    "stream": require.resolve("stream-browserify"),
    "process": require.resolve("process/browser")
  };
  return config;
};