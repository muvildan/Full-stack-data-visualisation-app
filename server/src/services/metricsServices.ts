import { MetricEntry } from '../types';
import metricsData from './metrics.json';

const metrics: MetricEntry[]= metricsData as MetricEntry[];

export const getMetrics = (): MetricEntry[] => metrics;

// export const findByName = (name: string): MetricEntry | undefined => {
//     const metric = metrics.find(metric => metric.name === name);
//     return metric;
// };

export const addMetric = (newMetricEntry: MetricEntry): MetricEntry => {
    const newMetric = {
        ...newMetricEntry
        }
    metrics.push(newMetric);
    return newMetric;  
};