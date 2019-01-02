var bodyParser = require('body-parser');

var data = [{item: 'play game'}, {item: 'read a book'}];

var urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
    // handle get request
    app.get('/todo', function(req, res) {
        res.render('todo', {todos: data});
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