import express from 'express';
// import * as metricServices from '../services/metricsServices';
// import toNewMetricEntry from '../utils';
import {storeMetric, getAllMetrics} from '../models/metricModel';

const metricsRouter = express.Router();

metricsRouter.get('/api/metrics', async (_req, res, next) => {
    try {
        let allMetrics = await getAllMetrics();
        res.json(allMetrics);
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