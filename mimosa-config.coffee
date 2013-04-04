exports.config =
  minMimosaVersion: "0.11.2"
  modules:['require-commonjs','lint','require','server','minify','live-reload','web-package']
  minify:
    exclude:[/\.min\./, "javascripts/app.js"]
