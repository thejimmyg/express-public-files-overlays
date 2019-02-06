# Express Public Files Overlays

Serves static files from one or more paths in your URL structure. Each URL path can map to one or more directories which will be searched in turn for a file to serve.


## Configuration

Configuration environment variables for the example.

* `PUBLIC_FILES` - JSON-encoded mapping of URL paths to serve static files at, and the directories to look in for each file under that path. e.g. `{"/public/js": ["./jquery/", "./react"], "/theme": ["./static"]}`

**Any configuration from `PUBLIC_FILES` gets merged into existing configuration such that it is used in preference to it. Effecrtively, the `PUBLIC_FILES` settings override settings defined in code.**

Additionally:

* `DEBUG` - Include `express-public-files-overlays` to get debug output from the `express-public-files-overlays` library itself and `express-public-files-overlays:server` for messages from the example server.


## Internal Workings

Internally, the code is designed to work in these stages:

* `publicFilesFromEnv(app)` - Parses and returns the config from the `PUBLIC_FILES` environment variable
* `preparePublicFiles(app, userDirs, libDirs)` - Sets up the publicFiles data structure in `app.locals` and makes `app.locals.publicFiles.overlay()` available (see next). `userDirs` and `libDirs` are optional. You usually pass the output of `publicFilesFromEnv(app)` as the `userDirs` variable and any public files directoires your library needs as the `libDirs` setting.
* `app.locals.publicFiles.overlay(urlPath, dirs)` - A function other libraries can use to merge any overlays they need into the `libDirs` configuration. The `userDirs` configuration will always overlay over the `libDirs` configuration, even if it is set up earlier.
* `setupPublicFiles(app)` - Installs the middleware based on the settings in `app.locals.publicFiles`. This should always come last.


## Example

```
DEBUG="express-public-files-overlays:server" npm start
```

Visit http://localhost:8000/public/hello.txt and you'll see the value `one` served from `./bin/public/hello.txt`.

If you specify `PUBLIC_FILES` too, the config from that will be used in preference. First files will first be searched for in `./bin/public` and then be searched for in `./bin/public-overlay`. You can try moving or deleting the files in those directories to see the behaviour in action:

```
DEBUG="express-public-files-overlays:server" PUBLIC_FILES='{"/public": ["./bin/public-overlay"]}' npm start
```

Visit http://localhost:8000/public/hello.txt this time and you'll see the value `one` served from `./bin/public-overlay/hello.txt` again. If you delete that file, `/public/hello.txt` will be served from `./bin/public/hello.txt`.


## Dev

```
npm run fix
npm run "docker:build"
npm run "docker:run"
npm run "docker:push"
```


## Changelog

### 0.1.0 2019-02-06

* First version
