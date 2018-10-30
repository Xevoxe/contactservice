const express = require('express');
const webServerConfig = require('../config/web-server');
const ContactsService = require('../controllers/contacts');

let server;

function initialize(){
    return new Promise((resolve,reject) => {
        const app = express();
        let router = express.Router();

        app.use(express.static(webServerConfig.public));
        app.use(express.json());
        app.use('/api/v1', router);

        server = app.listen(webServerConfig.port)
        .on('listening', ()=> {
            console.log(`Server running@${webServerConfig.domainName}:${webServerConfig.port}`);
            
            //Start Services
            //Contacts
            let contactsServiceV1 = new ContactsService(router);
            resolve();
        })
        .on(`error`, (err) => {
            reject(err);
        });
    });
}

function shutdown(){
    return new Promise((resolve,reject) => {
            server.close((err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve();
            });
    });
}

module.exports.shutdown = shutdown;
module.exports.initialize = initialize;