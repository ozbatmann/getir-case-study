const MongoClient = require('mongodb').MongoClient;
var {config} = require("./config.js");

// Connection class responsible for establishing connection with database.
class Connection {
    static connectToMongo() {
        if ( this.db ) return Promise.resolve(this.db);
        return MongoClient.connect(config.dbUrl, config.options)
            .then((client) => {
                this.db = client.db(config.dbName);
                console.info("Mongo Client connection established");
            }).catch((err) => {
                console.error('Mongo Client connection error: '+err);
            });
    }
}

Connection.db = null;

module.exports = { Connection };