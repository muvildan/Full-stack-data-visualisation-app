"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const metricsRoutes_1 = __importDefault(require("./routes/metricsRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 8080;
app.get('/', (_req, res) => {
    console.log("We're patched!");
    res.send('Hello World!');
});
app.use('/api/metrics', metricsRoutes_1.default);
app.use('/api/metrics/:name', metricsRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}/`);
});
