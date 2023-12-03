import path from 'path';
import getBuildWebpack from './config/build/buildWeback';
import { BuildOptions, EnvVariables } from './config/build/types';

const webpackConfig = (env: EnvVariables) => {
  const options: BuildOptions = {
    mode: env.mode ?? 'production',
    port: env.port ?? 3003,
    analyzer: env.analyzer ?? false,
    paths: {
      src: path.resolve(__dirname, 'src'),
      entry: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      dist: path.resolve(__dirname, 'dist'),
    },
  };

  return getBuildWebpack(options);
};

export default webpackConfig;
