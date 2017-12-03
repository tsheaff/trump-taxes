const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferPlugin = require('transfer-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = (env = {}) => {
  const files = fs.readdirSync('./app/controllers');

  const entries = {};
  _.forEach(files, (file) => {
    entries[file.split('.')[0]] = ['babel-polyfill', `./app/controllers/${file}`];
  });

  // loaders
  const jsLoader = {
    test: /\.(js|jsx)$/,
    loader: 'babel',
    include: [
      path.resolve(__dirname, 'app/components'),
      path.resolve(__dirname, 'app/controllers'),
      path.resolve(__dirname, 'app/models'),
      path.resolve(__dirname, 'app/utils'),
    ],
  };

  const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    loader: 'file?name=../fonts/[name].[ext]?[hash]',
    include: [
      path.resolve(__dirname, 'assets/source/fonts'),
    ],
  };

  const imageLoader = {
    test: /\.(jpg|jpeg|gif|png|svg)$/,
    loaders: ['file?context=./assets/source/images&name=../images/[path][name].[ext]?[hash]'],
    include: [path.resolve(__dirname, 'assets/source/images')],
  };

  const lessLoader = {
    test: /.less$/,
    loader: (() => {
      if (env.remote) {
        return ExtractTextPlugin.extract({
          use: 'css?sourceMap&minimize!postcss!less?sourceMap',
        });
      }
      return 'style!css!postcss!less';
    })(),
  };

  const jsonLoader = {
    test: /\.(json)$/,
    loader: 'json',
  };

  // plugins
  const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          /* eslint-disable global-require */
          require('postcss-assets')({
            loadPaths: [path.resolve(__dirname, 'assets/source/images')],
          }),
          require('autoprefixer'),
          /* eslint-enable global-require */
        ],
      },
    }),
    new ExtractTextPlugin('../css/[name].css'),
  ];

  plugins.push(new ParallelUglifyPlugin({
    uglifyJS: {
      compress: { warnings: false },
      output: { comments: false },
    },
  }));
  plugins.push(new TransferPlugin([
    { from: 'images', to: '../images' },
  ], path.join(__dirname, 'assets', 'source')));
  plugins.push(new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }));
  plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/));

  const config = {
    module: {
      rules: [
        fontLoader,
        imageLoader,
        jsLoader,
        lessLoader,
        jsonLoader,
      ],
    },

    entry: entries,
    output: {
      path: path.join(__dirname, 'assets', 'build', 'js'),
      publicPath: '/js/',
      filename: '[name].js',
    },

    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      emitter: 'empty',
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        components: path.resolve(__dirname, 'app/components'),
        styles: path.resolve(__dirname, 'app/styles'),
        _main: path.resolve(__dirname, 'app/styles/_main'),
        utils: path.resolve(__dirname, 'app/utils'),
      },
    },

    resolveLoader: {
      moduleExtensions: ['-loader'],
    },

    plugins: plugins,
    cache: true,
  };

  return config;
};
