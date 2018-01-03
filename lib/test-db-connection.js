const mongoose = require( 'mongoose' );

// URI that points to the testing database. This is for e2e & unit tests.
const dbTestURI = 'mongodb://dstock4:onwards_dialect_whipcord@ds133627.mlab.com:33627/test-recipe-app';

mongoose.Promise = Promise;
mongoose.connect( dbTestURI );

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log( 'Mongoose default connection open to ' + dbTestURI );
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log( 'Mongoose default connection error: ' + err );
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log( 'Mongoose default connection disconnected' );
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log( 'Mongoose default connection disconnected through app termination' );
        process.exit(0);
    });
});

module.exports = mongoose.connection;
