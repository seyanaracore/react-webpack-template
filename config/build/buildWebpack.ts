import getBuildRules from './buildRules';
import getBuildResolvers from './buildResolvers';
import getBuildPlugins from './buildPlugins';
import getBuildDevServer from './buildDevServer';
import getBuildOptimization from './buildOptimizations';
import type { Configuration } from 'webpack';
import type { BuildOptions } from './types';

const JS_FILE_NAME = '[name].[contenthash:8].js';

const getBuildWebpack = (options: BuildOptions): Configuration => ({
  mode: options.mode ?? 'production',
  entry: options.paths.entry,
  output: {
    path: options.paths.dist,
    filename: `js/${JS_FILE_NAME}`,
    clean: true,
    chunkFilename: `js/chunks/${JS_FILE_NAME}`,
    publicPath: options.globalEnv.BASE_URL,
  },
  optimization: getBuildOptimization(),
  module: {
    rules: getBuildRules(options),
  },
  devtool: options.mode !== 'production' && 'eval-source-map',
  resolve: getBuildResolvers(options),
  plugins: getBuildPlugins(options),
  devServer: getBuildDevServer(options),
  stats: {
    loggingDebug: ['sass-loader'],
  },
});

export default getBuildWebpack;
