import mongoose, { Document, Model, Schema, ConnectOptions } from 'mongoose';
import config from '../config/config';

const user = config.MONGO_USER;
const pwd = config.MONGO_PWD;
const url = config.MONGO_URL;
const connectionStr = `mongodb+srv://${user}:${pwd}@${url}`;

// set up the interface for the metric model
interface IMetric extends Document {
  timeStamp: string;
  name: string;
  value: boolean;
}

// create the schema
const metricSchema: Schema = new Schema({
  timeStamp: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: Boolean,
    required: true
  }
});

// format returned object
metricSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: IMetric) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// create the model
const Metric: Model<IMetric> = mongoose.model<IMetric>('Metric', metricSchema);

// create a function to store a metric in the database with mongoose

export const storeMultipleMetrics = async (metricsData: IMetric[]) => {
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
            db.close();
          } catch (error : unknown) {
            console.error('Error inserting metrics data:', error);
          }
    });

}
export const storeMetric = async (metric: IMetric) => {
  try {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('Connected to MongoDB');

    const newMetric = new Metric(metric);
    await newMetric.save();
    console.log('Metric saved successfully');
  } catch (error) {
    console.error('Error inserting metrics data:', error);
  } finally {
    mongoose.connection.close();
  }
};

export const getAllMetrics = async () => {
  try {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('Connected to MongoDB');

    const metrics = await Metric.find({});
    console.log('Retrieved all metrics successfully');
    return metrics;
  } catch (error) {
    console.error('Error retrieving metrics data:', error);
  } finally {
    mongoose.connection.close();
  }
};

export default Metric;