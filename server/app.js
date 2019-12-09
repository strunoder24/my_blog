const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const { port, connectionString } = require('./config');
const routes = require('./routes');
const cron = require('node-cron');
const { cleanBlacklist } = require('./models/TokenBlacklist');
const server = http.createServer(app);
const io = require('socket.io').listen(server);

const helmet = require('helmet');
app.use(helmet());

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);


cron.schedule('00 00 00 * * *', () => {
    cleanBlacklist()
});


server.listen(port, () => {
    console.log('listening on port ' + port);
});


let connections = [];

io.sockets.on('connection', function (socket) {
    connections.push(socket);
    
    socket.on('sendMessage', data => {
        console.log(data, 'who said im gae?');
    });
    
    //Disconnect
    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket));
        console.log('disconected');
    })
});