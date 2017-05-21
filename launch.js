var express = require('express')
var app = express()
app.set('view engine', 'jade');
app.use('/static', express.static('static'));
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
})

app.listen(3000, () => {
  console.log('Example app listening on Port 3000!');
})
