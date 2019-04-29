module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'test/spec.js',
    ],
    preprocessors: {
      'test/spec.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
        ],
      },
    },
    webpackServer: {
      noInfo: false,
    },
  });
};
