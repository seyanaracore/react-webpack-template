import { BuildOptions } from './types';
import getBuildRules from './buildRules';
import getBuildResolvers from './buildResolvers';
import getBuildPlugins from './buildPlugins';
import { Configuration } from 'webpack';
import getBuildOptimization from './buildOptimization';
import getBuildDevServer from './buildDevServer';

const getBuildWebpack = (options: BuildOptions): Configuration => {
  return {
    mode: options.mode ?? 'production',
    entry: options.paths.entry,
    output: {
      path: options.paths.dist,
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: '/',
    },
    module: {
      rules: getBuildRules(options),
    },
    devtool: options.mode !== 'production' && 'eval-source-map',
    resolve: getBuildResolvers(options),
    plugins: getBuildPlugins(options),
    devServer: getBuildDevServer(options),
    optimization: getBuildOptimization(),
    stats: {
      loggingDebug: ['sass-loader'],
    },
  };
};

export default getBuildWebpack;
