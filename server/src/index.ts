import express from 'express';
import metricsRouter from './routes/metricsRoutes';

const app = express();
app.use(express.json());

const PORT = 8080;

app.get('/', (_req, res) => {
  console.log("We're patched!")
  res.send('Hello World!');
});

app.use('/api/metrics', metricsRouter);
app.use('/api/metrics/:name', metricsRouter);

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}/`);
});