// TODO: gzip, cache strategy & use template.html for index to ensure cdn resources are current

import path from 'path'
import fsExtra from 'fs-extra'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import express from 'express'
import webpack from 'webpack'
import config from '../webpack/webpack.config.js'

const {PORT, NODE_ENV} = process.env

if (NODE_ENV === 'production') {
  fsExtra.ensureDir(config().output.path, () =>
    webpack(config(), (err) => {
      if (!err) return
      process.exit(1)
    }))
}

express().
  use(morgan('dev')).
  use(favicon(path.join(__dirname, 'public', './favicon.ico'))).
  use('/api/static', express.static(path.join(__dirname, 'public'))).
  get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', './index.html'))).
  listen(
    PORT, 'localhost',
    err => console.log(err || `Listening at http://localhost:${PORT}`))
