import { Configuration } from 'webpack';
import { BuildOptions } from './types';

const getBuildResolvers = (options: BuildOptions): Configuration['resolve'] => {
  return {
    extensions: ['.ts', '.js', '.tsx', '.json'],
    alias: {
      '@': options.paths.src,
    },
  };
};

export default getBuildResolvers;
