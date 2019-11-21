const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const { port, connectionString } = require('./config');
const routes = require('./routes');

const helmet = require('helmet');
app.use(helmet());

mongoose.connect(connectionString, {
    useNewUrlParser: true
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);

const server = http.createServer(app);
server.listen(port, () => {
    console.log('listening on port ' + port);
});