const webServer = require('./services/web-server');
const database = require('./d_apis/db-mongo');
const dotenv = require('dotenv');

dotenv.config();
async function startup(){
    try{
        console.log("Initializing Database Service")
        await database.initialize();

    }catch (err){
        console.error(err);
        process.exit(1);
    }

    try{
        console.log("Starting Server");
        await webServer.initialize();
    } catch (err){
        console.error(err);
        process.exit(1);
    }
}

async function shutdown(e){
    let err = e;

    console.log('Shutting down');

    try{
        console.log('Closing down database service');
        await database.close();
    }catch(e){
        console.log('Encoutnered error', e);
        err = err || e;
    }

    try{
        console.log('Closing web server module');
        await webServer.shutdown();
    }catch(e){
        console.log('Encoutnered error', e);
        err = err || e;
    }

    console.log('Exiting Process');

    if(err){
        process.exit(1);
    }else {
        process.exit(0);
    }
}

startup();

process.on('SIGTERM', ()=>{
    console.log(`Received SIGTERM`);
    shutdown();
});

process.on('SIGINT', ()=>{
    console.log(`Received SIGINT`);
    shutdown();
});

process.on('uncaughtException', err=>{
    console.log('Uncaught exception');
    console.error(err);
    shutdown(err);
});