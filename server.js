'use strict'

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const api = require('./server/routes/api');

const app = express();

mongoose.Promise = Promise;
var mongoUri = 'mongodb://localhost:27017/mean-app';
mongoose.connect(mongoUri, { useMongoClient: true })
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`)
});

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.static(path.join(__dirname, 'dist')));

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
});

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';

app.listen(port, () => console.log(`API running on localhost:${port}`));