import path from 'path';
import getBuildWebpack from './config/build';
import type { BuildOptions, EnvVariables } from './config/build/types';

const webpackConfig = (env: EnvVariables) => {
  const mode = env.mode ?? 'production';

  const options: BuildOptions = {
    mode,
    globalEnv: {
      APP_MODE: mode,
      BASE_URL: '/',
    },
    port: env.port ?? 3003,
    analyzer: env.analyzer ?? false,
    paths: {
      src: path.resolve(__dirname, 'src'),
      entry: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      dist: path.resolve(__dirname, 'dist'),
      tsConfig: path.resolve(__dirname, 'tsconfig.app.json'),
    },
  };

  return getBuildWebpack(options);
};

export default webpackConfig;
