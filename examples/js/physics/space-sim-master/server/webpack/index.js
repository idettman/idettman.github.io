import WebpackDevServer from 'webpack-dev-server'
import webpack from 'webpack'
import config from './webpack.config'
import services from '../_config/services'

const {PORT} = process.env

new WebpackDevServer(webpack(config()), {
  proxy: {'*': `http://localhost:${services.entry.port}`},
  noInfo: true,
  filename: 'app.js',
  publicPath: config().output.publicPath,
}).listen(
  PORT, 'localhost',
  err => console.log(err || `Listening at http://localhost:${PORT}`))
