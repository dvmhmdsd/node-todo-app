var express = require('express');
var todoControllers = require('./controllers/todoController')

var app = express();
// set the view engine
app.set('view engine', 'ejs');
//handle the requests of the static files
app.use(express.static('./public'));


//fire the controller
todoControllers(app);
// specify the port the app will run in 
//app.listen(3000);

//if u wanna make the port dynamic
app.listen(process.env.PORT || 3000);