import express, { Request, Response } from 'express';
import cors from 'cors';
const apiRouter = require('./api/apiRouter');
const app = express();
const path = require('path');

app.use('/api', apiRouter);
// Serve static files from public directory
app.use(express.static('public'))
app.use(cors());

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