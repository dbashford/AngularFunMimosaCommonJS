exports.config =
  modules:['require-commonjs','lint','require','server','minify','live-reload','web-package']
  minify:
    exclude:["\\.min\\.", "app.js"]
