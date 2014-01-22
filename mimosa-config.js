exports.config = {
  minMimosaVersion: "2.0.0",
  modules:[
    'require-commonjs',
    'jshint',
    'csslint',
    'require',
    'server',
    'minify-js',
    'minify-css',
    'live-reload',
    'web-package',
    'less',
    'stylus',
    'html-templates',
    'copy',
    'coffeescript'],
  minifyJS: {
    exclude:[/\.min\./, "javascripts/app.js"]
  }
}
