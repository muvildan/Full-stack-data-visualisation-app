"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMetric = exports.getMetrics = void 0;
const metrics_json_1 = __importDefault(require("./metrics.json"));
const metrics = metrics_json_1.default;
const getMetrics = () => metrics;
exports.getMetrics = getMetrics;
// export const findByName = (name: string): MetricEntry | undefined => {
//     const metric = metrics.find(metric => metric.name === name);
//     return metric;
// };
const addMetric = (newMetricEntry) => {
    const newMetric = Object.assign({}, newMetricEntry);
    metrics.push(newMetric);
    return newMetric;
};
exports.addMetric = addMetric;
