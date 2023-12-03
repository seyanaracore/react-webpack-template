import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { BuildOptions } from './types';

const getBuildDevServer = (options: BuildOptions): DevServerConfiguration => ({
  hot: true,
  open: true,
  historyApiFallback: true,
  port: options.port,
});

export default getBuildDevServer;
