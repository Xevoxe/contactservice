const express = require('express');
const webServerConfig = require('../config/web-server')

let server;

function initialize(){
    return new Promise((resolve,reject) => {
        const app = express();

        app.use(express.static(webServerConfig.public));
        app.use(express.json());

        server = app.listen(webServerConfig.port)
        .on('listening', ()=> {
            console.log(`Server running@${webServerConfig.domainName}:${webServerConfig.port}`);
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