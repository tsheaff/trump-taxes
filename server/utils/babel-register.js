require.extensions['.less'] = () => {};

require('babel-register')({
  presets: ['es2017', 'react', 'stage-0'],
  plugins: ['transform-decorators-legacy'],
  ignore: /node_modules/,
  extensions: ['.js', '.jsx'],
});
