const Mongoose = require('mongoose');

const TweetSchema = new Mongoose.Schema({
    id: {type: Object},
    idUser: {type: String, required: true},
    title: {type: String, required: true},
    completed: {type: Boolean, required: true},
});

module.exports = Mongoose.model("Tweet", TweetSchema)