const express = require('express');
const cors = require('cors');
const db = require('./app/models/index.models');
require('dotenv').config();

const server = express();

var corsOptions = {
    origin: 'http://localhost::8080'
};

server.use(cors(corsOptions));
server.use(express.json());

db.connection.sync()
    .then(() => console.log('DB connections was successful'))
    .catch((err) => {
        console.log(`DB connection error: ${err}`)
    });

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});