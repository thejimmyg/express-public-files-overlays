const express = require('express')
const path = require('path')
const { preparePublicFiles, setupPublicFiles, publicFilesFromEnv } = require('express-public-files-overlays')

const app = express()
preparePublicFiles(app, publicFilesFromEnv(app))

// Any other express setup can change app.locals.publicFiles.libDirs here to add
// additional library-defined public files directories to be served.  Any user
// defined directories will be prepended before any corresponding URL path in
// the library directories list. The safest way to add overlays is with the
// overlay() function demonstrated here.
app.locals.publicFiles.overlay('/public', [path.join(__dirname, 'public')])

setupPublicFiles(app)
app.listen(8000, () => console.log(`Example app listening on port 8000`))
