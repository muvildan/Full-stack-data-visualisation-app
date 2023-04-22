require ('./db/mongo');

import Metric from './models/metricModel';
import express from 'express';
import metricsRouter from './routes/metricsRoutes';
import config from './config/config';
import notFound from './middleware/notFound';
import errorHandler from './middleware/handleError';

const app = express();
app.use(express.json());

app.get('/api/metrics', (_req, res, next) => {
  Metric.find({}).then((metrics) => {
    try {
      res.status(200).json(metrics);
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        next(error);
      }
    }
  });
});

// error handling from middleware
app.use(notFound);
app.use(errorHandler);

app.use('/api/metrics', metricsRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on: http://localhost:${config.PORT}/`);
});