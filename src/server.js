import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

const server = express();

mongoose.connect('mongodb://localhost:27017/tindev', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);
