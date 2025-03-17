import express, { Request, Response } from 'express';
const apiRouter = require('./api/apiRouter');
const app = express();
const path = require('path');

app.use('/api', apiRouter);

let port:number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
  });
}

app.listen(port);
console.log(`Listening on port ${port}`);