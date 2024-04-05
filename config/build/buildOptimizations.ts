import TerserPlugin from 'terser-webpack-plugin';
import type { BuildOptions } from './types';
import type { Configuration } from 'webpack';

const JS_FILE_NAME = '[name].[contenthash:8].js';

const getBuildOptimization = (options: BuildOptions): Configuration['optimization'] => ({
  minimize: options.mode === 'production',

  minimizer: [
    new TerserPlugin({
      minify: TerserPlugin.swcMinify,
      // `terserOptions` options will be passed to `swc` (`@swc/core`)
      // Link to options - https://swc.rs/docs/config-js-minify
      terserOptions: {},
    }),
  ],

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
