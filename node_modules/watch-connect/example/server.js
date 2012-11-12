var Path = require('path'),
  connect = require('connect'),
  reloadOnChange = require('..');

var path = Path.resolve(__dirname, 'fixture');

var server = connect();
server.use(reloadOnChange({ watchdir: path, server: server, verbose: true}));
server.use(connect.static(path));

server.listen(3000, function(){
  console.log('listening on http://127.0.0.1:3000');
});
