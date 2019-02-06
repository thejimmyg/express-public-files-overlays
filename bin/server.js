const express = require('express')
const path = require('path')
const debug = require('debug')('express-public-files-overlays:server')
const { preparePublicFiles, setupPublicFiles, publicFilesFromEnv } = require('../index.js')

const app = express()
app.locals.debug = debug
const userDirs = publicFilesFromEnv(app)
const libDirs = {}
preparePublicFiles(app, userDirs, libDirs)

// Any other express setup can change app.locals.publicFiles.lib here to add
// additional library-defined public files directories to be served.  Any user
// defined directories will be prepended before any corresponding URL path in
// the library directories list.
app.locals.publicFiles.overlay('/public', [path.join(__dirname, 'public')])

setupPublicFiles(app)
app.listen(8000, () => console.log(`Example app listening on port 8000`))
