import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    console.log(user, socket.id);
    connectedUsers[user] = socket.id;
});

mongoose.connect('mongodb://localhost:27017/tindev', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
