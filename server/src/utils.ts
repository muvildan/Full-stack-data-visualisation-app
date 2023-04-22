import { MetricEntry, Name } from './types';

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
    return Object.values(Name).includes(param);
};

// validation of timestamp for new metric entries
const parseTimeStamp = (timeStampFromReq: any): string => {
    const formatTimeStampFromReq = new Date(timeStampFromReq).toISOString();
    if (!isString(formatTimeStampFromReq)) {
        throw new Error('Timestamp data type is incorrect.');
    } 
    else if (!formatTimeStampFromReq || !(formatTimeStampFromReq)) {
        throw new Error('Timestamp data is missing.');
    }
    else if (formatTimeStampFromReq > (new Date(Date.now()).toISOString())) {
        throw new Error('Timestamps must have happened before now.');
    }
    else if (formatTimeStampFromReq < new Date("2023-04-01T00:00:01Z").toISOString()) {
        throw new Error('Timestamps must have happened after April 1st 2023.');
    } else {
        return timeStampFromReq;
    }
};

// validation for name of new metric entries
const parseName = (nameFromReq: any): Name => {
    if (!nameFromReq || !(nameFromReq)) {
        throw new Error('Please, make sure to enter name.');
    }
    else if (!isName(nameFromReq)) {
        throw new Error(nameFromReq + ' is not a valid name. Choose one of the existing metrics: ' + Object.values(Name));
    }
    else {
        return nameFromReq;
    };
};

// validation of values for new metric entries
const parseValue = (valueFromReq: any): boolean => {
    if (valueFromReq === null || valueFromReq === undefined) {
        throw new Error('Please, make sure to enter a value.');
    }
    else if (!isBoolean(valueFromReq)) {
        throw new Error('Please, introduce a different data type: ' + typeof valueFromReq + 's are not valid values.');
    }
    else {
        return valueFromReq;
    };
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
