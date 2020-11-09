let mongoose = require('mongoose');

let mongoDB = 'mongodb://localhost/database';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.log.bind(console, 'MongoDB conection error'));

module.exports = {
    mongoose
};