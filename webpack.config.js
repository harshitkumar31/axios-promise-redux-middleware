var webpack = require('webpack');
var env = process.env.NODE_ENV;


var plugins = [
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(env)
}),
new webpack.optimize.OccurrenceOrderPlugin()
];

if (env === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
    );
}

module.exports = {
  entry: './src/index.js',
  module: {
    loaders: [
    { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
    { test: /\.png$/, loader: "url-loader?mimetype=image/png" }, 
    { test: /\.gif$/, loader: "url-loader" }
    ]
  },
  output: {
    library: 'axiosReduxMiddleware',
    libraryTarget: 'umd',
    filename: 'lib/index.js',
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js']
  }
};