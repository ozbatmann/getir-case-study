const config = {
    dbUrl : 'mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study',
    dbName: "getir-case-study",
    options: {
        reconnectTries: 5000,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

module.exports = {
    config : config
};