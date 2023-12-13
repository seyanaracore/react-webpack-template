import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Configuration } from 'webpack';
import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { EsbuildPlugin } from 'esbuild-loader';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import type { BuildOptions, GlobalEnv } from './types';

const getBuildPlugins = (options: BuildOptions): Configuration['plugins'] => {
  const isProduction = options.mode === 'production';
  const isDevelopment = !isProduction;

  const globalEnv: Record<keyof GlobalEnv, string> = {
    APP_MODE: JSON.stringify(options.mode),
  };

  const plugins: Configuration['plugins'] = [
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: options.paths.html,
    }),

    // https://github.com/privatenumber/esbuild-loader
    new EsbuildPlugin({
      css: true, // Apply minification to CSS assets
    }),

    new DefinePlugin(globalEnv),
  ];

  if (options.analyzer) plugins.push(new BundleAnalyzerPlugin());

  if (isProduction) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
        // флаг для решения бага
        // https://stackoverflow.com/questions/51971857/mini-css-extract-plugin-warning-in-chunk-chunkname-mini-css-extract-plugin-con
        ignoreOrder: true,
      })
    );
  }

  if (isDevelopment) {
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  return plugins;
};

export default getBuildPlugins;
