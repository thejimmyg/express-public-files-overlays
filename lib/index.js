const express = require('express')
const debug = require('debug')('express-public-files-overlays')

const publicFilesFromEnv = (app) => {
  const dirs = JSON.parse(process.env.PUBLIC_FILES || '{}')
  debug(dirs)
  return dirs
}

const setupPublicFiles = (app) => {
  const configs = [app.locals.publicFiles.userDirs, app.locals.publicFiles.libDirs]
  for (let j = 0; j < configs.length; j++) {
    const config = configs[j]
    if (config) {
      for (let urlPath in config) {
        if (config.hasOwnProperty(urlPath)) {
          debug('Dirs:', config[urlPath])
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

const preparePublicFiles = (app, userDirs, libDirs) => {
  app.locals.publicFiles = {
    userDirs: userDirs || {},
    libDirs: libDirs || {},
    overlay: (urlPath, dirs) => {
      // Safer to use the whole path in case someone has replaced
      // the objects
      if (!app.locals.publicFiles.libDirs[urlPath]) {
        app.locals.publicFiles.libDirs[urlPath] = []
      }
      for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i]
        app.locals.publicFiles.libDirs[urlPath].unshift(dir)
      }
    }
  }
}

module.exports = { preparePublicFiles, setupPublicFiles, publicFilesFromEnv }
