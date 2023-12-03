import { BuildOptions } from './types';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const getBuildDevServer = (options: BuildOptions): DevServerConfiguration => {
  return {
    hot: true,
    open: true,
    historyApiFallback: true,
    port: options.port,
  };
};

export default getBuildDevServer;
