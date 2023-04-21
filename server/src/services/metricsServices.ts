import { MetricEntry } from '../types';
import metricsData from './metrics.json';

const metrics: Array<MetricEntry> = metricsData as Array<MetricEntry>;

export const getEntries = () => metrics;

export const addEntry = () => null;