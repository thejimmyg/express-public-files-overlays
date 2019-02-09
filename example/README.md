# Express Public Files Overlays Example

You can test the example with:

```
cd ../
npm install
cd example
npm install
PORT=8000 npm start
```

To see the debug logs:

```
DEBUG="express-public-files-overlays,express-public-files-overlays:server" PORT=8000 npm start
```

Or to log everything, use:

```
DEBUG="*" PORT=8000 npm start
```


Visit http://localhost:8000/public/hello.txt and you'll see the value `one` served from `./bin/public/hello.txt`.

If you specify `PUBLIC_FILES` too, the config from that will be used in preference. First files will first be searched for in `./bin/public` and then be searched for in `./bin/public-overlay`. You can try moving or deleting the files in those directories to see the behaviour in action:

```
DEBUG="express-public-files-overlays,express-public-files-overlays:server" PUBLIC_FILES='{"/public": ["./bin/public-overlay"]}' PORT=8000 npm start
```

Visit http://localhost:8000/public/hello.txt this time and you'll see the value `one` served from `./bin/public-overlay/hello.txt` again. If you delete that file, `/public/hello.txt` will be served from `./bin/public/hello.txt`.


## Docker

Docker can't copy files from a parent directory so the `docker:build` command puts the current dev version of express-public-files-overlays in this directory and created a modified `package.json.docker`:

```
npm run docker:build && npm run docker:run
```

## Dev

```
npm run fix
```
