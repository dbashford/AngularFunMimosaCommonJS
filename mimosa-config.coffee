exports.config =
  minMimosaVersion: "0.8.5"
  modules:['require-commonjs','lint','require','server','minify','live-reload','web-package']
  minify:
    exclude:[/\.min\./, "javascripts/app.js"]
