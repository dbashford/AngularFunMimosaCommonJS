express = require 'express'
bodyParser = require 'body-parser'
engines = require 'consolidate'
compression = require 'compression'
favicon = require 'serve-favicon'
cookieParser = require 'cookie-parser'
errorHandler = require 'errorhandler'

exports.startServer = (config, callback) ->

  nextId = 0
  people = [
    {"id": "#{nextId++}", "name": "Saasha", "age": "5"}
    {"id": "#{nextId++}", "name": "Planet", "age": "7"}
  ]

  isUniqueName = (name) ->
    (name for person in people when person.name is name).length is 0

  app = express()

  # setup views and port
  app.set 'views', config.server.views.path
  app.engine config.server.views.extension, engines[config.server.views.compileWith]
  app.set 'view engine', config.server.views.extension
  app.set 'port', process.env.PORT || config.server.port || 3000

  # middleware
  app.use compression()
  # uncomment and point path at favicon if you have one
  # app.use favicon "path to fav icon"
  app.use bodyParser.json()
  app.use bodyParser.urlencoded {extended: true}
  app.use cookieParser()
  app.use express.static config.watch.compiledDir
  if app.get('env') is 'development'
    app.use errorHandler()

  routeOptions =
    reload:    config.liveReload.enabled
    optimize:  config.isOptimize ? false
    cachebust: if process.env.NODE_ENV isnt "production" then "?b=#{(new Date()).getTime()}" else ''

  router = express.Router()

  router.get '/', (req, res) ->
    res.render 'index', routeOptions

  router.get '/people', (req, res) ->
    res.json people

  router.post '/people', (req, res) ->
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

  router.get '/people/details/:id', (req, res) ->
    id = req.params.id
    current = person for person in people when parseInt(person.id, 10) is parseInt(id, 10)
    res.json current

  app.use '/', router

    # start it up
  server = app.listen app.get('port'), ->
    console.log 'Express server listening on port ' + app.get('port')

  callback server