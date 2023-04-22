import mongoose from 'mongoose';
import config from '../config/config';

const user = config.MONGO_USER;
const pwd = config.MONGO_PWD;

const connectionStr = `mongodb+srv://${user}:${pwd}@takehomechallenge.pervyt1.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(connectionStr)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to MongoDB', err));