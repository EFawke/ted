import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const apiRouter = require('./api/apiRouter');
const googleRouter = require('./auth/googleRouter');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
app.use('/auth/google', googleRouter);
// Serve static files from public directory
app.use(express.static('public'))

app.use('/uploads', express.static(path.join(__dirname, './public/uploads')));

let port:number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
  });
}

app.listen(port);
console.log(`Listening on port ${port}`);