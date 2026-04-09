const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          ...webpackConfig.resolve?.fallback,
          stream: require.resolve('stream-browserify'),
          buffer: require.resolve('buffer'),
          process: require.resolve('process/browser'),
          util: false,
          path: false,
          fs: false,
          net: false,
          tls: false,
          crypto: false,
          http: false,
          https: false,
          zlib: false,
        },
      };

      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      ];

      return webpackConfig;
    },
  },
};
