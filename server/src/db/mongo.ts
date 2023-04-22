import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
import config from '../config/config';
import metricsData from '../services/metrics.json';
import Metric from '../models/metricModel';

const user = config.MONGO_USER;
const pwd = config.MONGO_PWD;

const connectionStr = `mongodb+srv://${user}:${pwd}@takehomechallenge.pervyt1.mongodb.net/metricsDB?retryWrites=true&w=majority`;

mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to MongoDB', err));

    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', async() => {
        const metrics = metricsData.map((metric: any) => new Metric({
            timeStamp: metric.timeStamp,
            name: metric.name,
            value: metric.value
          })); 
          try {
            await Metric.insertMany(metrics);
            console.log('Metrics data inserted successfully');
          } catch (error : unknown) {
            console.error('Error inserting metrics data:', error);
          }
        
    db.close();

    });
