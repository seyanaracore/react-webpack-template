import type { Configuration } from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';
import { resolveExtensions } from './resolveExtensions';

const getBuildResolvers = (): Configuration['resolve'] => ({
  extensions: resolveExtensions,
  plugins: [
    new TsconfigPathsPlugin({
      extensions: resolveExtensions,
      configFile: path.resolve(__dirname, '../../tsconfig.app.json'),
    }),
  ],
});

export default getBuildResolvers;
