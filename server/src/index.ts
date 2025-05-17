import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './router';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(port,() =>{
  console.log(`Server is running on port http://localhost:${port}/`);
})

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', (err: Error) => console.error(err));

app.use('/', router())