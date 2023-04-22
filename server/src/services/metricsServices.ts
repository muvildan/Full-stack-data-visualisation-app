import { MetricEntry } from '../types';
import metricsData from './metrics.json';

const metrics: MetricEntry[]= metricsData as MetricEntry[];

export const getMetrics = (): MetricEntry[] => metrics;

export const addMetric = (newMetricEntry: MetricEntry): MetricEntry => {
    const newMetric = {
        ...newMetricEntry
        }
    metrics.push(newMetric);
    return newMetric;  
};