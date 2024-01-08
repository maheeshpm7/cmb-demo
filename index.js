var express = require('express')
var app = express()
var port = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('Hello World! booo v beta')
})

if (process.env.NODE_ENV === 'test') {
  module.exports = app
} else {
  app.listen(port)
}
