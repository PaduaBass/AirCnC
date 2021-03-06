const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');


const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('' , {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

const connectedUsers = {};

io.on('connect', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

server.listen(3333);
