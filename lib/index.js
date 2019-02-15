const express = require('express')
const path = require('path')
const debug = require('debug')('express-public-files-overlays')
const fs = require('fs')
const { promisify } = require('util')
const accessAsync = promisify(fs.access)
const yaml = require('js-yaml')

const publicFilesFromEnv = (app) => {
  const dirs = yaml.safeLoad(process.env.PUBLIC_FILES || '{}')
  debug(`PUBLIC_FILES environment variable:`, dirs)
  return dirs
}

const setupPublicFiles = (app) => {
  const configs = [app.locals.publicFiles.userDirs, app.locals.publicFiles.libDirs]
  for (let j = 0; j < configs.length; j++) {
    const config = configs[j]
    if (config) {
      for (let urlPath in config) {
        if (config.hasOwnProperty(urlPath)) {
          for (let i = 0; i < config[urlPath].length; i++) {
            const dir = config[urlPath][i]
            debug(`Set up ${urlPath} to serve from ${dir}`)
            app.use(urlPath, express.static(dir))
          }
        }
      }
    }
  }
}

const preparePublicFiles = (app, userDirs) => {
  app.locals.publicFiles = {
    userDirs: userDirs || {},
    libDirs: [],
    overlay: (urlPath, dirs) => {
      // Safer to use the whole path in case someone has replaced
      // the objects
      if (!app.locals.publicFiles.libDirs[urlPath]) {
        app.locals.publicFiles.libDirs[urlPath] = []
      }
      for (let i = 0; i < dirs.length; i++) {
        const dir = path.normalize(dirs[i])
        accessAsync(dir, fs.constants.R_OK).catch((e) => {
          const msg = `WARNING: Cannot access directory ${dir}: ${e}`
          console.error(msg)
          debug(msg)
          return true
        })
        debug(`Overlaying at ${urlPath} the directory ${dir}`)
        app.locals.publicFiles.libDirs[urlPath].unshift(dir)
      }
    }
  }
}

module.exports = { preparePublicFiles, setupPublicFiles, publicFilesFromEnv }
