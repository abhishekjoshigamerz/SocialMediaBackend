const express = require('express');
const router = express.Router();
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const db = require('./config/database');
dotenv.config();
const port = process.env.APP_PORT || 8000;
app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use('/', require('./routes/api/'));





app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: http://localhost:${port}`);
});
