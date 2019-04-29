import path from 'path'
import webpack from 'webpack'
import services from '../_config/services'

const DEVELOPMENT = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

module.exports = (options = {}) => {
  const {quiet = false} = options

  return {
    devtool: 'source-map',
    entry: [
      DEVELOPMENT && `webpack-dev-server/client?http://localhost:${services.webpack.port}`,
      './client/index',
    ].filter(v => v),
    output: {
      path: path.join(__dirname, '../static/public/builds'),
      filename: 'app.js',
      publicPath: '/api/static/builds',
    },
    plugins: DEVELOPMENT ? [
      new webpack.NoErrorsPlugin(),
      function log() {
        this.plugin('done', stats => {
          const json = stats.toJson()
          if (quiet) return null
          return (
            json.errors.length ?
              json.errors.forEach(v => console.log(`\x07${v}`)) :
            json.warnings.length ?
              json.warnings.forEach(v => console.log(v)) :
              console.log(stats.toString({chunks: false, colors: true})))
        })
      }] : [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
        }),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false,
          },
        })],
    // allows importing from folders outside the project (with webpack loaders)
    // useful for developing related modules
    resolveLoader: {root: path.join(process.cwd(), 'node_modules')},
    resolve: {
      // similar to NODE_PATH on server
      modulesDirectories: ['', 'client', 'node_modules'],
      extensions: ['', '.js'],
      alias: {
        // prevents react being included twice
        react: path.join(process.cwd(), 'node_modules/react'),
      },
    },
    externals: {
      // these libraries use a CDN
      lodash: '_',
      moment: 'moment',
      three: 'THREE',
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          include: /(client|src)/,
          exclude: /node_modules/,
        },
        {
          test: /\.json$/,
          loader: 'json',
        },
        {
          test: /\.gl\.(vert|frag)$/,
          loader: 'raw',
        },
      ],
    },
  }
}
