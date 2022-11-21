import express, { Application, Request, Response, NextFunction } from 'express';
import multer, { memoryStorage } from 'multer';

import { router as userRoutes } from './routes/user.routes';

const app: Application = express();

app.use('/users', userRoutes);

app.post(
  '/',
  multer({ storage: memoryStorage() }).single('file'),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) throw new Error()
      // console.log(req.file?.buffer);
      res.json({ message: 'Update ok' });
    } catch (error) {
      res.json({ message: 'Not ok' });
    }
  }
);

app.use('/', (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: 'Allo! Catch-all route.' });
});

export default app;
