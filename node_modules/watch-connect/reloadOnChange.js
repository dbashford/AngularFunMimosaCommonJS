// # reloadOnChange
//
// this one will use raw connect middleware application with socket.io
// connection setup.
//
// It works by injecting a tiny client-side script on any `*.html` request (might be better
// if done on any `content-type: text/html`, this way it would be able to catch up requests,
// even those serving dynamic content, not just statics). That client side establish
// a new websocket connection and retrigger a page reload whenever the `changed` event is emitted.
//
var fs = require('fs'),
  path = require('path'),
  url = require('url'),
  socketio = require('socket.io'),
  logio = new (require('socket.io/lib/logger'))(),
  watchTree = require("chokidar"),
  sockets = {},
  // one time-hit, get the file content of the socket.io client side script
  ioScript = fs.readFileSync(path.join(__dirname, './util/socket-enable.js'), 'utf8');

// Possible options are :
// * watchdir: string path the directories to watch (required)
// * server: http server to hook our reload (required)
// * basedir: path to the base directory of our served files (optional)
// * additionaldirs: array of additional paths to watch
// * verbose: be verbose or not (default=false)
// * skipAdding: don't add socket io scripts, already been hand added/used
// * exclude: files to exclude from watch, so therefore they will not force refresh of page
module.exports = function(options){
  if(!options || !options.watchdir || !options.server) return console.error('[watch-connect]', 'Options missing');

  var dirsToWatch = [options.watchdir];
  if (options.additionaldirs) {
    dirsToWatch = dirsToWatch.concat(options.additionaldirs);
  }

  dirsToWatch.forEach(function (dir) {
    if(!fs.statSync(dir)) return console.error('[watch-connect]', 'Unable to watch ' + dir, err.message);
  });

  var exclude = ["\\/\\.","node_modules"];
  if (options.exclude) {
    exclude = exclude.concat(options.exclude);
  }

  var reg = new RegExp(exclude.join('|'));
  var watcher = watchTree.watch(dirsToWatch, {ignored:reg , persistent: true});
  watcher.on('all', function() {
    emit(options);
  });
  watcher.on('error', function(error) {
    // Doing nothing at the moment, just need to trap error event
    //console.log("ERROR: ", error)
  });

  // setup socketio
  var io = socketio.listen(options.server);
  io.enable('browser client minification');
  io.enable('browser client etag');
  io.enable('browser client gzip');
  io.set('log level', 1);

  io.sockets.on('connection', function(socket) {

    socket.on('disconnect', function() {
      if(options.verbose) console.log('[watch-connect]', 'Remove client ' + socket.id);
      if(sockets[socket.id]) delete sockets[socket.id];
    });

    if(options.verbose) console.log('[watch-connect]', 'Add client ' + socket.id);
    sockets[socket.id] = socket;
  });

  return function reloadOnChange(req, res, next) {
    // serve any static *.html, support of `index.html`
    var parsed = url.parse(req.url),

      // join / normalize from root dir
      filepath = path.normalize(path.join(options.basedir || options.watchdir, decodeURIComponent(parsed.pathname))),

      // index.html support when trainling `/`
      index = path.normalize('/') === filepath.charAt(filepath.length - 1);


    if(index) filepath += 'index.html';

    // deal with our special socket.io client-side script
    if(path.basename(filepath) === 'socket-enable.js') {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Content-Length', ioScript.length);
      return res.end(ioScript);
    }

    // skip adding assumes socket.js scripts have been hand
    // added to resulting template
    if (options.skipAdding) return next();

    // skip non html files
    if (path.extname(filepath) != '.html') return next();

    fs.stat(filepath, function(e, stat) {
      // files do not exists, next with error only on unexpected errors
      if(e) {
        if(options.verbose) console.error('[watch-connect]', e);
        return next();
      }

      // file is a dir, next to the directory listing if enabled
      if(stat.isDirectory()) return next();

      // anything that's not `*.html`, give back control to static / directory listing middleware
      if(path.extname(filepath) !== '.html') return next();

      // setup some basic headers, might add some. Below is pretty minimalist (might tweak and add
      // basic caching stuff for example)
      res.setHeader('Content-Type', 'text/html');

      // can't use the ideal stream / pipe case, we need to alter the html response
      // by injecting that little socket.io client-side app.
      fs.readFile(filepath, 'utf8', function(e, body) {
        if(e) return next(e);

        if(options.verbose) console.log('[watch-connect]', 'Append scripts in ' + filepath);
        body = body.replace(/<\/body>/, function(w) {
          return [
            '  <script defer src="/socket.io/socket.io.js"></script>',
            '  <script defer src="/socket-enable.js"></script>'
          ].join('\n');
        });

        res.setHeader('Content-Length', body.length);
        res.end(body);
      });
    });
  };
};

// basic reload tasks, works in tandem with serve task
function emit(options){
  if(options.verbose) console.log('[watch-connect]', 'Changes detected');
  if(options.verbose && !Object.keys(sockets)) return console.error('[watch-connect]', 'No client connected to socket.io');
  Object.keys(sockets).forEach(function(s) {
    if(options.verbose) console.log('[watch-connect]', 'reload clients');
    sockets[s].emit('changed');
  });
}
