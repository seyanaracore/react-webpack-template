import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Configuration } from 'webpack';
import type { BuildOptions } from './types';

const getBuildRules = (options: BuildOptions): NonNullable<Configuration['module']>['rules'] => {
  const isProduction = options.mode === 'production';

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const tsxLoader = {
    // https://github.com/privatenumber/esbuild-loader
    // Match `.js`, `.jsx`, `.ts` or `.tsx` files
    test: /\.[jt]sx?$/,
    loader: 'esbuild-loader',
    options: {
      // JavaScript version to compile to
      target: 'es2015',
    },
  };

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Extract styles to file or insert to js
      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      // Translates CSS into CommonJS
      {
        loader: 'css-loader',
        options: {
          modules: {
            exportLocalsConvention: 'camelCase',
          },
        },
      },
      'postcss-loader',
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  const svgLoaders = [
    {
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/, // *.svg?url
    },
    {
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            babel: false,
            svgoConfig: {
              plugins: [
                {
                  name: 'convertColors',
                  params: {
                    currentColor: true,
                  },
                },
              ],
            },
          },
        },
      ],
    },
  ];

  return [tsxLoader, cssLoader, assetLoader, ...svgLoaders];
};

export default getBuildRules;
