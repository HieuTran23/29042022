const express = require('express')
const { PORT } = require('./config')
const { databaseConnection } = require('./database')
const loaderApp = require('./loaders/loader-app')

const StartServer = async() => {
    const app = express();

    await databaseConnection();

    await loaderApp(app)

    console.log

    app.listen(PORT, () => {
        console.log(`Server run in port ${PORT}`);
    }).on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();