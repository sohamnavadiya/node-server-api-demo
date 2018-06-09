var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://mongodb-stitch-sample-ipjjx:7gShZY30dHAhodZ0@cluster0-cdzyn.mongodb.net/admin');

var Todo = mongoose.model('Todo', {
    text: {

    },
    completed: {

    }
})
