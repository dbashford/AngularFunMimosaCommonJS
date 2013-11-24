exports.config =
  minMimosaVersion: "1.0.0"
  modules:['require-commonjs','jshint','csslint','require','server','minify','live-reload','web-package']
  minify:
    exclude:[/\.min\./, "javascripts/app.js"]
