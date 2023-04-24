import express from 'express';
import cors from 'cors';
import metricsRouter from './routes/metricsRoutes';
import config from './config/config';
import notFound from './middleware/notFound';
import errorHandler from './middleware/handleError';

const app = express();
app.use(express.json());

const options: cors.CorsOptions = {
  origin: 'http://localhost:3000/'
};

app.use(cors(options));

// error handling from middleware
app.use(notFound);
app.use(errorHandler);
// routes
app.use('/', metricsRouter);

app.listen(config.PORT, () => {
    console.log(`Server running on: http://localhost:${config.PORT}/`);
});