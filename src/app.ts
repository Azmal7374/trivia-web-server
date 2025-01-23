import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cors({ origin:'http://localhost:5173', credentials: true}));
// application routes
// app.use('/api', router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Not found',
  });
});

export default app;