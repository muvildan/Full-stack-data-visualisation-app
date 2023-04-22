import express from 'express';
import * as metricServices from '../services/metricsServices';
import toNewMetricEntry from '../utils';

const router = express.Router();

router.get('/api/metrics', (_req, res, next) => {
    try {
        res.json(metricServices.getMetrics());
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            next(error)
        }
    }
});

router.post('/api/metrics', (req, res, next) => {
    try {
        const newMetricEntry = toNewMetricEntry(req.body);
        const addedMetricEntries = metricServices.addMetric(newMetricEntry);
        res.json(addedMetricEntries);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            next(error)
        } 
    }
});

export default router;