import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
// app.ts
import googleRouter from './auth/googleRouter';

dotenv.config();
const apiRouter = require('./api/apiRouter');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
app.use('/auth/google', googleRouter);
app.use(express.static('public'))

app.use('/uploads', express.static(path.join(__dirname, './public/uploads')));

let port:number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../', 'frontend', 'build', 'index.html'));
  });
}

app.listen(port);
console.log(`Listening on port ${port}`);