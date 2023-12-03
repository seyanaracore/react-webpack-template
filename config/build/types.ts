import type { Configuration } from 'webpack';
import type { Linter } from 'eslint';

export type AppMode = Exclude<Configuration['mode'], 'none'>;

export type EnvVariables = {
  mode?: AppMode;
  port?: number;
  analyzer?: boolean;
};

export type GlobalEnv = {
  APP_MODE: AppMode;
  BASE_URL: string;
};

export type BuildOptions = {
  mode: AppMode;
  globalEnv: GlobalEnv;
  port: number;
  analyzer: boolean;
  paths: {
    entry: string;
    public: string;
    html: string;
    dist: string;
    src: string;
    tsConfig?: string;
  };
};

type ESLintConfigGlobals = NonNullable<Required<Linter.BaseConfig['globals']>>;
export type EslintGlobal = Record<keyof GlobalEnv, ESLintConfigGlobals[keyof ESLintConfigGlobals]>;
