const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerOptions = require('../swagger.json');

const app = express();

const swaggerJSDoc = require('swagger-jsdoc');  
const swaggerUI = require('swagger-ui-express');  

const swaggerDocs = swaggerJSDoc(swaggerOptions);  
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));  

app.use(express.json()); 

//enable CORS (for testing only -remove in production/deployment)
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.use(morgan('dev'));


module.exports = {app};