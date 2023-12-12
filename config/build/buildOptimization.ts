import { EsbuildPlugin } from 'esbuild-loader';

const getBuildOptimization = () => ({
  minimizer: [
    // https://github.com/privatenumber/esbuild-loader
    new EsbuildPlugin({
      target: 'es2015', // Syntax to transpile to (see options below for possible values)
    }),
  ],
});

export default getBuildOptimization;
