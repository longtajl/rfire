var express = require('express')
var app = express()
app.set('view engine', 'jade');
app.use('/static', express.static('static'));
app.get('/*', (req, res) => {
  res.render('index', {});
})
app.listen(3000, () => {
  console.log(' Sample rfire app listening on Port 3000!');
})
