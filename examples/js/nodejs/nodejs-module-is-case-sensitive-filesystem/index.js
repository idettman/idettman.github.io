'use strict'

const fs = require('fs')
const path = require('path')

const isCaseSensitive = (p, cb) => {
  if (/[a-z]/.test(p))
    test(p, p.toUpperCase(), cb)
  else if (/[A-Z]/.test(p))
    test(p, p.toLowerCase(), cb)
  else {
    const bytes = crypto.randomBytes(8).toString('hex')
    const tmp = path.join(path.dirname(p), '_cst' + bytes)
    fs.writeFile(tmp, '', er =>
      er ? cb(er)
      : test(p, p.toUpperCase(), (er, res) =>
          fs.unlink(tmp, () => cb(er, res))))
  }
}

const test = (p1, p2, cb) => {
  fs.stat(p1, (er, st1) => {
    if (er)
      cb(er)
    else
      fs.stat(p2, (er, st2) => er ? cb(null, true)
        : cb(null, st1.dev !== st2.dev || st1.ino !== st2.ino))
  })
}

isCaseSensitive.sync = p => {
  if (/[a-z]/.test(p))
    return testSync(p, p.toUpperCase())
  else if (/[A-Z]/.test(p))
    return testSync(p, p.toLowerCase())
  else {
    const bytes = crypto.randomBytes(8).toString('hex')
    const tmp = path.join(path.dirname(p), '_cst' + bytes)
    fs.writeFileSync(tmp, '')
    try {
      return testSync(tmp, tmp.toUpperCase())
    } finally {
      try { fs.unlinkSync(tmp) } catch (er) {}
    }
  }
}

const testSync = (p1, p2) => {
  const st1 = fs.statSync(p1)
  let st2
  try {
    st2 = fs.statSync(p2)
  } catch (er) {
    return true
  }
  return st1.dev !== st2.dev || st1.ino !== st2.ino
}

module.exports = isCaseSensitive
