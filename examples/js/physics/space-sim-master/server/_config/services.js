/**
 * Process configuration for server/index.js
 *
 * Uses forever-monitor (https://github.com/foreverjs/forever-monitor)
 * to start services.
 *
 * All the options for forever-monitor are supported and additionally:
 *
 * Keys mapped to UIDs / file locations
 * Clustering via 'instances' property
 * Port is auto-incremented based on instance (access via process.env.PORT)
 * NODE_PATH set automatically
 * watch=true in dev & vice versa for prod (unless overridden w/ boolean or array of paths)
 * Logs in server/_logs
 */

const PROD = process.env.NODE_ENV === 'production'

export default _.pickBy({
  webpack: !PROD && {
    port: 8000,
  },
  entry: {
    port: PROD ? 8000 : 8001,
  },
  data: {
    port: 8002,
  },
  static: {
    port: 8003,
    instances: PROD ? 2 : 1,
  },
})
