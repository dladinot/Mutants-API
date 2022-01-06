const getConnection  = require('../datasources/conexion').getConnection;

const dnaStorageDao = {
    insertDna: async (dnaChain,typeOfDna) => {
        try {
            const pool = await getConnection();
            const client = await pool.connect();
            const result = await client.query("CALL SP_INSERT_DNA($1,$2)",[dnaChain,typeOfDna]);
            client.release()
        } catch (error) {
            console.log(error);
            return { error: { message: "Unexpected error in insertDna ", status: 503 } };
        }
    },
    getStats: async () => {
        try {
            const pool = await getConnection();
            const client = await pool.connect();
            const result = await client.query("SELECT * FROM FN_GET_STATS()");
            client.release()
            return result.rows;
        } catch (error) {
            console.log(error);
            return { error: { message: "Unexpected error in getStats ", status: 503 } };
        }
    },    
};

module.exports = dnaStorageDao;