import path from 'path';
import { removeDeepPattern, readJson } from '../helpers';
import type { Configuration } from 'webpack';
import type { CompilerOptions } from 'typescript';
import type { BuildOptions } from './types';

const extensions = ['.ts', '.js', '.tsx', '.json'];

const getBuildResolvers = (options: BuildOptions): Configuration['resolve'] => {
  const baseConfig = {
    extensions,
  };

  if (!options.paths.tsConfig) return baseConfig;

  // tsconfig-paths-webpack-plugin don't work with ts config composite

  const tsConfigPaths = (readJson(options.paths.tsConfig).compilerOptions as CompilerOptions).paths;

  if (!tsConfigPaths) return baseConfig;

  const handledPaths = removeDeepPattern(tsConfigPaths).map(([aliasName, aliasPath]) => [
    aliasName,
    path.resolve(__dirname, '../..', aliasPath),
  ]) as unknown as [string, string][];

  const alias = Object.fromEntries<string>(handledPaths);

  return {
    extensions,
    alias,
  };
};

export default getBuildResolvers;
