# Example


```
DEBUG="express-public-files-overlays,express-public-files-overlays:server" npm start
```

Visit http://localhost:8000/public/hello.txt and you'll see the value `one` served from `./bin/public/hello.txt`.

If you specify `PUBLIC_FILES` too, the config from that will be used in preference. First files will first be searched for in `./bin/public` and then be searched for in `./bin/public-overlay`. You can try moving or deleting the files in those directories to see the behaviour in action:

```
DEBUG="express-public-files-overlays,express-public-files-overlays:server" PUBLIC_FILES='{"/public": ["./bin/public-overlay"]}' npm start
```

Visit http://localhost:8000/public/hello.txt this time and you'll see the value `one` served from `./bin/public-overlay/hello.txt` again. If you delete that file, `/public/hello.txt` will be served from `./bin/public/hello.txt`.


## Dev

```
npm run fix
npm run "docker:build"
npm run "docker:run"
npm run "docker:push"
```
