import path from 'path';
import { loader as MiniCssExtractLoader } from 'mini-css-extract-plugin';
import { loadConfig as loadBrowsersListConfig } from 'browserslist';
import type { Configuration, RuleSetUseItem } from 'webpack';
import type { BuildOptions } from './types';

const getCssLoaders = (isProduction: boolean): RuleSetUseItem[] => [
  ...[isProduction ? MiniCssExtractLoader : 'style-loader'],
  {
    loader: 'css-loader',
    options: {
      modules: {
        mode: 'local',
        auto: true,
        exportGlobals: true,
        localIdentName: isProduction ? '[local]__[hash:base64:8]' : '[path][name]__[local]',
        exportLocalsConvention: 'camelCase',
      },
    },
  },
  'postcss-loader',
];

const getBuildRules = (options: BuildOptions): NonNullable<Configuration['module']>['rules'] => {
  const isProduction = options.mode === 'production';

  const assetLoader = {
    test: /\.(ico|gif|png|jpg|jpeg|webp)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'img/[name].[hash:8].[ext]',
    },
  };

  const fontsLoader = {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name].[hash:8].[ext]',
    },
  };

  const tsxLoader = {
    // Match `.js`, `.jsx`, `.ts` or `.tsx` files
    test: /\.[jt]sx?$/,
    loader: 'swc-loader',
    exclude: /node_modules/,
    options: {
      /**
       * swc-loader does not load .browserslist config despite
       * https://swc.rs/docs/configuration/supported-browsers
       */
      env: {
        // debug: true,
        targets: loadBrowsersListConfig({
          path: path.resolve(__dirname, '../..'),
          env: options.mode,
        }),
        mode: 'usage',
        coreJs: '3.36.1',
      },
    },
  };

  const cssLoader = {
    test: /\.css$/,
    use: getCssLoaders(isProduction),
  };

  const sassLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      ...getCssLoaders(isProduction),
      {
        loader: 'sass-loader',
        options: {
          additionalData: `
            @use "@/assets/scss/variables" as *;
            @use "@/assets/scss/mixins" as *;
          `,
        },
      },
    ],
  };

  // https://react-svgr.com/docs/webpack/
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
            // babel: false,
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

  return [tsxLoader, sassLoader, cssLoader, assetLoader, fontsLoader, ...svgLoaders];
};

export default getBuildRules;
