import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import googleRouter from './auth/googleRouter';

dotenv.config();
const apiRouter = require('./api/apiRouter');
const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', true);

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, 'https://' + req.headers.host + req.url);
    }
    next();
  });
}

app.use('/api', apiRouter);
app.use('/auth/google', googleRouter);
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, './public/uploads')));

let port: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.resolve(__dirname, '../../frontend/build');
  console.log("Serving static files from:", buildPath);
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
