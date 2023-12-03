import type { Configuration } from 'webpack';

const JS_FILE_NAME = '[name].[contenthash:8].js';

const getBuildOptimization = (): Configuration['optimization'] => ({
  chunkIds: 'named',
  // runtimeChunk: 'single',

  splitChunks: {
    chunks: 'all',

    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        filename: `js/vendors/${JS_FILE_NAME}`,
      },
    },
  },
});

export default getBuildOptimization;
