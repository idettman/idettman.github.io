import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import solarSystem from './solarSystem'

const {PORT} = process.env

express().
  use(morgan('dev')).
  use(bodyParser.json()).
  get('/api/data/solar-system', solarSystem).
  listen(
    PORT, 'localhost',
    err => console.log(err || `Listening at http://localhost:${PORT}`))
