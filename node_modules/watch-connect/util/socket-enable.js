(function() {

  // todo, pass the hostname too, will be required
  // for the socket connection to work remotely (eg. not only on local machine)
  var url = 'http://localhost';
    socket = io.connect(url);

  // watched files just changed, reload page.
  // also retrigger on reconnect event
  socket
    .on('changed', reload)
    .on('reconnect', reload);

  function reload() { location.reload(); }
})();
