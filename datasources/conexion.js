const pgCon = require('pg')
const pools = []
let config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.SOURCE_DATABASE,
    port : process.env.DB_PORT
}


const getConnection = async function () {
    try {
        if (pools.length === 0) {
            return new pgCon.Pool(config);
        }      
        return pools[0]
    } catch (error) {
        console.log("Error connecting to DB");
        console.log(error);
        throw error
    }
}

module.exports = {getConnection}
