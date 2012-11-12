express = require 'express'
engines = require 'consolidate'

exports.startServer = (config) ->

  nextId = 0
  people = [
    {"id": "#{nextId++}", "name": "Saasha", "age": "5"}
    {"id": "#{nextId++}", "name": "Planet", "age": "7"}
  ]

  isUniqueName = (name) ->
    (name for person in people when person.name is name).length is 0

  app = express()
  server = app.listen config.server.port, ->
     console.log "Express server listening on port %d in %s mode", config.server.port, app.settings.env

  app.configure ->
    app.set 'port', config.server.port
    app.set 'views', config.server.views.path
    app.engine config.server.views.extension, engines[config.server.views.compileWith]
    app.set 'view engine', config.server.views.extension
    app.use express.favicon()
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use express.compress()
    app.use app.router
    app.use express.static(config.watch.compiledDir)

  app.configure 'development', ->
    app.use express.errorHandler()

  options =
    reload:    config.liveReload.enabled
    optimize:  config.isOptimize ? false
    cachebust: if process.env.NODE_ENV isnt "production" then "?b=#{(new Date()).getTime()}" else ''

  app.get '/', (req, res) -> res.render 'index', options
  app.get '/people', (req, res) -> res.json people
  app.post '/people', (req, res) ->
    name = req.body.name
    message =
      "title": "Duplicate!"
      "message": "#{name} is a duplicate.  Please enter a new name."
    return res.send(message, 403) if not isUniqueName name
    person =
      "id": "#{nextId++}"
      "name": "#{name}"
      "age": "0"
    people.push person
    res.json person

  app.get '/people/details/:id', (req, res) ->
    id = req.params.id
    current = person for person in people when parseInt(person.id, 10) is parseInt(id, 10)
    res.json current

  server