import express from 'express';
import * as metricServices from '../services/metricsServices';
import toNewMetricEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(metricServices.getMetrics());
});

// router.get('/:name', (req, res) => {
//     const metric = metricServices.findByName(req.params.name);
//     return (metric != null) ? res.send(metric) : res.sendStatus(404);
// });

router.post('/', (req, res) => {
    try {
        const newMetricEntry = toNewMetricEntry(req.body);
        const addedMetricEntries = metricServices.addMetric(newMetricEntry);
        res.json(addedMetricEntries);
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).send(error.message);
        } 
    }
});

export default router;