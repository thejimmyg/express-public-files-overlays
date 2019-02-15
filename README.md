# Express Public Files Overlays

Serves static files from one or more paths in your URL structure. Each URL path can map to one or more directories which will be searched in turn for a file to serve.


## Configuration

The components in this package make use of the `app.locals.publicFiles` namespace. The `preparePublicFiles()` function helps set up the data structure correctly.

Configuration environment variables for the example.

* `PUBLIC_FILES` - JSON or YAML encoded mapping of URL paths to serve static files at, and the directories to look in for each file under that path. e.g. `{"/public/js": ["./jquery/", "./react"], "/theme": ["./static"]}`

**Any configuration from `PUBLIC_FILES` gets merged into existing configuration such that it is used in preference to it. Effectively, the `PUBLIC_FILES` settings override settings defined in code.**

Additionally:

* `DEBUG` - Include `express-public-files-overlays` to get debug output from the `express-public-files-overlays` library itself and `express-public-files-overlays:server` for messages from the example server.


## Internal Workings

Internally, the code is designed to work in these stages:

* `publicFilesFromEnv(app)` - Parses and returns the config from the `PUBLIC_FILES` environment variable
* `preparePublicFiles(app, userDirs)` - Sets up the publicFiles data structure in `app.locals` and makes `app.locals.publicFiles.overlay()` available (see next). `userDirs` is optional. You usually pass the output of `publicFilesFromEnv(app)` as the `userDirs` variable and then use `overlay()` (see next) to add any public files directoires your library needs to the internal `libDirs`.
* `app.locals.publicFiles.overlay(urlPath, dirs)` - A function other libraries can use to merge any overlays they need into the `libDirs` configuration. The `userDirs` configuration will always overlay over the `libDirs` configuration, even if it is set up earlier.
* `setupPublicFiles(app)` - Installs the middleware based on the settings in `app.locals.publicFiles`. This should always come last.


## Example

See the `./example` directory.


## Dev

```
npm run fix
```


## Changelog

### 0.1.3 2019-02-15

* Removed `libDirs` from `preparePublicFiles()`, use `overlay()` instead.
* Support YAML as well as JSON in `PUBLIC_FILES_DIRS`
* Fixed docs
* Added warning if dir doesn't exist

### 0.1.2 2019-02-08

* Improved Docker example
* Added `path.normalize()` to the directories specified in `overlay()`
* Improved logging
* Removed accidentally added JS files. They are released under the licenses described here: https://github.com/thejimmyg/bootstrap-flexbox-overlay/blob/5b85a49741c1521c77fff1bff0b56947fa804854/LICENSE.md and https://github.com/defunkt/jquery-pjax/blob/master/LICENSE

### 0.1.1 2019-02-07

* Changed debug behaviour to use own `debug()`, not `app.locals.debug()`.
* Moved the example to `./example`.

### 0.1.0 2019-02-06

* First version
