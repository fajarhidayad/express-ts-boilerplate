import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes';
import cors from 'cors';
import 'dotenv/config';

const NODE_ENV = process.env.NODE_ENV;

// App config
const app = express();
app.use(cors());
app.use(express.json());

// Routes config
app.use('/api/v1', router);

// Not found handler
app.use('*', (req, res, next) => {
  if (req.statusCode !== 404) {
    next();
  }

  res.status(404).json({
    message: `${req.originalUrl} route is not found`,
  });
});

// Global error handlers
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'fail';
  err.statusCode = err.statusCode || 500;

  if (NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      message: err.message,
      status: err.statusCode,
      stack: err.stack,
    });
  }

  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
  });
});

// Server port config
const PORT = process.env.NODE_PORT ?? 3005;
app.listen(PORT, () => {
  console.log(`Server listen at http://localhost:${PORT}`);
});
