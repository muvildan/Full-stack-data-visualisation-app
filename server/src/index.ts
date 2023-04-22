import express from 'express';
import metricsRouter from './routes/metricsRoutes';
import config from './config/config';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  console.log("We're patched!")
  res.send('Hello World!');
});

app.use('/api/metrics', metricsRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on: http://localhost:${config.PORT}/`);
});