import mongoose, { Document, Model, Schema } from 'mongoose';

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

export default Metric;
