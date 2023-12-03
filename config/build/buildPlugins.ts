import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { DefinePlugin, ProgressPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import chalk from 'chalk';
import type { Configuration } from 'webpack';
import type { BuildOptions, GlobalEnv } from './types';

const getBuildPlugins = (options: BuildOptions): Configuration['plugins'] => {
  const isProduction = options.mode === 'production';
  const isDevelopment = !isProduction;

  const globalEnv = Object.entries(options.globalEnv).reduce<Record<keyof GlobalEnv, string>>(
    (acc, [key, value]) => {
      acc[key] = JSON.stringify(value);
      return acc;
    },
    {} as never
  );

  const plugins: Configuration['plugins'] = [
    new DefinePlugin(globalEnv),
    new ProgressPlugin({
      handler(percentage, message, ...args) {
        const perc = chalk.rgb(0, 213, 262)(`${Math.round(+percentage * 100)}%`);

        // eslint-disable-next-line no-console
        console.info(`${perc} -->`, message, ...args);
      },
    }),
  ];

  if (options.paths.html) {
    // https://github.com/jantimon/html-webpack-plugin
    plugins.push(
      new HtmlWebpackPlugin({
        template: options.paths.html,
      })
    );
  }

  if (options.analyzer) plugins.push(new BundleAnalyzerPlugin());

  if (isProduction) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
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
