var express = require('express');
const bodyParser = require("body-parser");

// DB Connection handler class.
const { Connection } = require('./db/Connection.js');

// Express application is created.
const app = express();

// Application port.
const port=process.env.PORT || 3000;

// Used for request body parsing needs.
app.use(bodyParser.json());

// Routing to records.js
// /records requests are handled using using records.js
var recordsRouter = require('./routes/records');
app.use('/records', recordsRouter);

// 404 route not found error
app.use((req, res, next) => {
    return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
});

// 500 any server error
app.use((err, req, res, next) => {
    return res.status(500).send({ error: err });
});

// I shared the mongoDB connection.
app.listen(port, () => {
    console.info(`REST API running on port ${port}`);
    // Now MongoDB connection is established. Database has been reached.
    // One database connection will be used till the lifetime of the application.
    // Exception handler
    Connection.connectToMongo();

});
module.exports = {app};