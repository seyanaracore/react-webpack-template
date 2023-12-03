import type { Configuration } from 'webpack';

export type AppMode = Exclude<Configuration['mode'], 'none'>;

export type EnvVariables = {
  mode?: AppMode;
  port?: number;
  analyzer?: boolean;
};

export type GlobalEnv = {
  __APP_MODE__: AppMode;
};

export type BuildOptions = {
  mode: AppMode;
  port: number;
  analyzer: boolean;
  paths: {
    entry: string;
    public: string;
    html: string;
    dist: string;
    src: string;
  };
};
