var express = require('express');
var todoController = require('./controllers/todoController')

var app = express();
// set the view engine
app.set('view engine', 'ejs');
//handle the requests of the static files
app.use(express.static('./public'));


//fire the controller
todoController(app);
// specify the port the app will run in 
app.listen(3000);