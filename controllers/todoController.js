var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var data = [{item: 'play game'}, {item: 'read a book'}];

var urlEncodedParser = bodyParser.urlencoded({extended: false});

//connect with the db
mongoose.connect('mongodb://test12:test12@ds247674.mlab.com:47674/to-do', { useNewUrlParser: true });

//like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

//create a model
var Todo = mongoose.model('Todo', todoSchema);
/* //to push 1 item into the db
var item1 = Todo({item: 'buy flowers'}).save(function(err) {
    if(err) throw err;
    console.log('item saved');
}); */

module.exports = function(app) {
    // handle get request
    /* app.get('/todo', function(req, res) {
        res.render('todo', {todos: data});
    }); */
    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if (err) throw err;

            res.render('todo', {todos: data});
        });
    });

    // handle post requests
    app.post('/todo', urlEncodedParser, function(req, res) {
        data.push(req.body);
        res.json(data); // to send it to the front-end
    });

    // handle delete requests
    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo) {
            return todo.item.replace(/ /g, "-") !== req.params.item; // we used replace method to match that on the ajax file
        });
        res.json(data);
    });
};