const mongoose = require('mongoose');
const dbConfig = require('../config/db-config');



async function initialize(){
    await mongoose.connect(dbConfig.mongoURI);
}

async function close(){
    await mongoose.connection.close();
}

module.exports.initialize = initialize;
module.exports.close = close;


