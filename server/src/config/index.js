const dotEnv  = require("dotenv");

if (process.env.NODE_ENV !== 'prod') {
    const configFile =  `./.env.${process.env.NODE_ENV}`;
    dotEnv.config();
} else {
    dotEnv.config();
}

module.exports = {

    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,
    APP_SECRET: process.env.APP_SECRET,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}
 