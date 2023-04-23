import express from 'express';
import metricsRouter from './routes/metricsRoutes';
import config from './config/config';
import notFound from './middleware/notFound';
import errorHandler from './middleware/handleError';

const app = express();
app.use(express.json());

// error handling from middleware
app.use(notFound);
app.use(errorHandler);

app.use('/', metricsRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on: http://localhost:${config.PORT}/`);
});