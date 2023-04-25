import Metric, {storeMultipleMetrics} from '../models/metricModel';

const metricName = [
    'newVisitor','newVisitor','newVisitor','newVisitor','newVisitor','newVisitor',
    'fullScrollDown','fullScrollDown','fullScrollDown',
    'buttonHover','buttonHover','buttonHover','buttonHover',
    'buttonClick','buttonClick','buttonClick',
    'formInteraction','formInteraction',
    'applicationSubmitted'
];

const Calendar: {
    weeks: Record<string, { startDay: number, holidays?: number, naturalDays?: number, weekStartDay?: number }>,
    multiplier?: number[],
    nonWorkingDayThreshold: number[],
    workDayThreshold: number[],
    peakThreshold: number,
    peakTime: number[],
  } = {
    weeks: {
        week0: {
            startDay: 1,
            naturalDays: 2,
            weekStartDay: 6,
        },
        week1: {
            startDay: 3,
            holidays: 7,        
        },
        week2: {
            startDay: 10,
            holidays: 10,
        },
        week3: {
            startDay: 17,
        },
        week4: {
            startDay: 24,
        },
    },
    multiplier: [
        1,1,
        1,1,1,1,1,1,1,
        1,1,2,1.9,1.8,1.7,1.6,
        1.5,1.4,2,1.9,1.8,1.7,1.6,
        1.5,1.4,1.3,1.2,1.1,1,1
    ],
    nonWorkingDayThreshold: [
        25, 100
    ],
    workDayThreshold: [
        100, 150
    ],
    peakThreshold: 80,
    peakTime: [10, 18],
}

Object.keys(Calendar.weeks).forEach( async (week: string) => {
    let data = [];
    let startDay = Calendar.weeks[week].startDay;
    let naturalDays = Calendar.weeks[week].naturalDays || 7;
    let nonWorkingDayThreshold = Calendar.nonWorkingDayThreshold;
    let workDayThreshold = Calendar.workDayThreshold;
    let sessions = 0;
    let multiplier = Calendar.multiplier || [1,1,1,1,1,1,1];

    for (let i = startDay; i < startDay + naturalDays; i++) {
        const dayTimestamp = new Date(2023, 3, i);
        let isWeekend = (dayTimestamp.getDay() === 6) || (dayTimestamp.getDay() === 0);

        if (isWeekend) {
            sessions = Math.floor(Math.random() * nonWorkingDayThreshold[1]) + nonWorkingDayThreshold[0];
        } else {
            sessions = Math.floor(Math.random() * workDayThreshold[1]) + workDayThreshold[0];
        }

        console.log('sessions ' + sessions + ' multiplier ' + multiplier[dayTimestamp.getDate()-1]);

        sessions = Math.floor(sessions * multiplier[dayTimestamp.getDate()-1]);

        console.log('day ' + i + ' should have ' + sessions + ' sessions');

        for (let z = 0; z < sessions; z++) {
            // console.log(getRandomTimestamp(dayTimestamp));
            const metricEntry = new Metric({
                timeStamp: getRandomTimestamp(dayTimestamp),
                name: metricName[Math.floor(Math.random() * metricName.length) + 0],
                value: true
            });
            data.push(metricEntry);
        }
    }

    console.log('storing week ' + week);
    await storeMultipleMetrics(data);
});


function getRandomTimestamp(day: Date): string {

    const peak = Math.floor(Math.random() * 24) + 1;

    let startTimestamp = new Date().setHours(18, 0, 0, 0);
    let endTimestamp = new Date().setHours(10, 0, 0, 0);

    if (peak < 9) {
        startTimestamp = new Date().setHours(10, 0, 0, 0);
        endTimestamp = new Date().setHours(18, 0, 0, 0);
    }

    const random = Math.random();
    
    const range = endTimestamp - startTimestamp;
    const randomOffset = Math.floor(random * range);
    const randomTimestamp = startTimestamp + randomOffset;

    const date = new Date(randomTimestamp);
    date.setDate(day.getDate());
    
    const isoString = date.toISOString();
    const formattedString = isoString.slice(0, 19) + 'Z';
    
    return formattedString;
  }



