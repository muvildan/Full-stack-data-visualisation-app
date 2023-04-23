import express from 'express';
import * as metricServices from '../services/metricsServices';
// import toNewMetricEntry from '../utils';
import {storeMetric} from '../models/metricModel';

const metricsRouter = express.Router();

metricsRouter.get('/api/metrics', (_req, res, next) => {
    try {
        res.json(metricServices.getMetrics());
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            next(error)
        }
    }
});

metricsRouter.post('/api/metrics', (req, res, next) => {
    try {
        storeMetric(req.body);
        res.json('ok');
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            next(error)
        } 
    }
});

export default metricsRouter;