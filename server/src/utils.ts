import { MetricEntry, Name } from './types';

// date type validation
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// string type validation
const isString = (string: any): boolean => {
    return typeof string === 'string' || string instanceof String;
};

// boolean type validation
const isBoolean = (boolean: any): boolean => {
    return typeof boolean === 'boolean' || boolean instanceof Boolean;
};

// name type validation
const isName = (param: any): boolean => {
    console.log(Object.values(Name));
    return Object.values(Name).includes(param);
};

// validation of timestamp for new metric entries
const parseTimeStamp = (timeStampFromReq: any): string => {
    const formatTimeStampFromReq = new Date(timeStampFromReq).toISOString();;
    switch(timeStampFromReq) {
        case (isString(formatTimeStampFromReq) || isDate(formatTimeStampFromReq)):
            throw new Error('Incorrect or missing timestamp: ' + timeStampFromReq);
        case (formatTimeStampFromReq || (formatTimeStampFromReq)):
            throw new Error('Incorrect or missing timestamp: ' + timeStampFromReq);
        case (formatTimeStampFromReq > Date.now().toString()):
            throw new Error('Incorrect or missing timestamp: ' + timeStampFromReq);
        case (timeStampFromReq < new Date("2023-04-01T00:00:01Z")):
            throw new Error('Incorrect or missing timestamp: ' + timeStampFromReq);
        default:
            return timeStampFromReq;
    }
};

// validation for name of new metric entries
const parseName = (nameFromReq: any): Name => {
    switch(nameFromReq) {
        case (isString(nameFromReq) || isName(nameFromReq)):
            throw new Error('Incorrect or missing name: ' + nameFromReq);
        case (nameFromReq || (nameFromReq)):
            throw new Error('Incorrect or missing name: ' + nameFromReq);
        default:
            console.log(nameFromReq)
            return nameFromReq;
    }
};

// validation of values for new metric entries
const parseValue = (valueFromReq: any): boolean => {
    switch(valueFromReq) {
        case (isBoolean(valueFromReq)):
            throw new Error('Incorrect or missing value: ' + valueFromReq);
        case (valueFromReq || (valueFromReq)):
            throw new Error('Incorrect or missing value: ' + valueFromReq);
        default:
            return valueFromReq;
    }
};

// validation of new metric entries
const toNewMetricEntry = (object: any): MetricEntry => {
    const newEntry: MetricEntry = {
        name: parseName(object.name),
        value: parseValue(object.value),
        timeStamp: parseTimeStamp(object.timeStamp)
    };
    return newEntry;
};

export default toNewMetricEntry;
