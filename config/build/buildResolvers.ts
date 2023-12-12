import type { Configuration } from 'webpack';
import type { BuildOptions } from './types';
import { resolveExtensions } from './resolveExtensions';

const getBuildResolvers = (options: BuildOptions): Configuration['resolve'] => ({
  extensions: resolveExtensions,
  alias: {
    '@': options.paths.src,
  },
});

export default getBuildResolvers;
