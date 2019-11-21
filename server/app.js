const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes');

const helmet = require('helmet');
app.use(helmet());

mongoose.connect(config.connectionString, {
    useNewUrlParser: true
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);

const server = http.createServer(app);
server.listen(8000, () => {
    console.log('listening on port 8000');
});