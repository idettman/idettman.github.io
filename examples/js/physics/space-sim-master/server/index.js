import path from 'path'
import fs from 'fs'
import fsExtra from 'fs-extra'
import forever from 'forever-monitor'
import moment from 'moment'
import chalk from 'chalk'
import services from './_config/services'

const PROD = process.env.NODE_ENV === 'production'

// returns regex for ignorePaths or null
const watch = (options, name) => {
  if (PROD) return null
  let directories = options
  if (!(options instanceof Array)) directories = ['_config', '_utils', name]
  return [fileName => fileName && directories.every(dir => fileName.slice(0, dir.length) !== dir)]
}

// prepare services config for consumption by forever-monitor
let children = _.chain(services)
  .toPairs()
  .map(([name, service]) =>
    _.range(service.instances || 1)
      .map(i => {
        const watchIgnorePatterns = watch(service.watch, name)
        const uid = service.instances > 1 ? `${name}-${i + 1}` : name
        return {
          uid,
          watch: !!watchIgnorePatterns,
          watchIgnorePatterns,
          watchDirectory: watchIgnorePatterns && __dirname,
          // logging handled manually
          silent: true,
          outFile: /^win/.test(process.platform) ? '/NUL' : '/dev/null',
          errFile: /^win/.test(process.platform) ? '/NUL' : '/dev/null',
          ...service,
          env: {
            // chalk doesn't print color outside pipes unless overridden
            FORCE_COLOR: !PROD,
            PORT: service.port ? service.port + i : null,
            FILE: name,
            NODE_PATH:
              ['../', '.', `./${name}`]
                .map(v => path.join(__dirname, v))
                .join(/^win/.test(process.platform) ? ';' : ':'),
            ...service.env,
          },
        }
      }))
  .flatten()
  .value()

// start the services
children = children.map(service =>
  forever.start(`${__dirname}/bootloader`, service))

const stripAnsi = str =>
  str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')

const log = ({childUid, status}, data) => {
  // strip ANSI & date file logs
  fsExtra.ensureDir(`${__dirname}/_logs/${moment().format('YYYY-MM-DD')}`, () =>
    fs.appendFile(
      `${__dirname}/_logs/${moment().format('YYYY-MM-DD')}/${childUid}.log`,
      stripAnsi(data.toString('utf8')),
      'utf8'
    ))

  // prefix UIDs to each line of log output
  process[status === 'error' ? 'stderr' : 'stdout'].write(
    data
    .toString('utf8')
    .split('\n')
    .map(line =>
      line &&
      `${chalk[status === 'error' ? 'red' : 'gray'](`[${childUid}]: `)}${line}`)
      .join('\n')
    )
}

children.forEach(child => {
  child.on('stdout', log.bind(null, {childUid: child.uid, status: 'ok'}))
  child.on('stderr', log.bind(null, {childUid: child.uid, status: 'error'}))
  child.on('watch:restart', ({stat}) => console.log(
    `Restarting ${chalk.green(child.uid)} (${stat.replace(__dirname, '')} changed)`))
})
