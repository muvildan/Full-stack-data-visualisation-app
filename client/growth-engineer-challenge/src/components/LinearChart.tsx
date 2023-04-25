/* eslint-disable @typescript-eslint/no-unused-vars */
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
);

type Data = {
    timeStamp: string;
    name: string;
    value: boolean;
  };
  
  type Props = {
    allMetrics: Data[];
    graphModeProp?: string;
    selectedDateProp?: Date;
  };

  interface InteractionData {
    [key: string]: {
      [key: string]: number;
    };
  }
  

function LinearChart({ allMetrics, graphModeProp, selectedDateProp }: Props) {

    const interactionsByNameAndDay: InteractionData = {};
    const interactionsByNameDayHour: InteractionData = {};

    allMetrics.forEach((interaction) => {
        const date = new Date(interaction.timeStamp);
        const interactionName = interaction.name;
        const day = date.getUTCDate().toString();
        const hour = date.getUTCHours().toString();

        if (!interactionsByNameAndDay[interactionName]) {
          interactionsByNameAndDay[interactionName] = {};
        }

        if (!interactionsByNameAndDay[interactionName][day]) {
          interactionsByNameAndDay[interactionName][day] = 0;
        }

        if (date.getUTCDate().toString() === day) {
          interactionsByNameAndDay[interactionName][day]++;
        }

        if (selectedDateProp && date.getUTCDate() === selectedDateProp.getUTCDate()) {
          if (!interactionsByNameDayHour[interactionName]) {
            interactionsByNameDayHour[interactionName] = {};
          }
        
          if (!interactionsByNameDayHour[interactionName][hour]) {
            interactionsByNameDayHour[interactionName][hour] = 0;
          }
        
          interactionsByNameDayHour[interactionName][hour]++;
        }        

      });

      const monthlyDataArr: any[] = [];
      const dailyDataArr: any[] = [];
      let monthlyLabelArr: string[] = [];
      let dailyLabelArr: string[] = [];
      const themeColor = [
        'rgba(50, 60, 168, 0.4)',
        'rgba(168, 166, 50, 0.4)',
        'rgba(168, 86, 50, 0.4)',
        'rgba(88, 168, 50, 0.4)',
        'rgba(151, 50, 168, 0.4)',
        'rgba(50, 168, 155, 0.4)'
      ]
      const dataTheme = {
            pointStyle: 'rectRounded',
            pointBackgroundColor: 'rgba(191, 191, 191, 0.5)',
            pointBorderColor: 'rgba(191, 191, 191, 0.5)',
            pointWidth: 2,
            backgroundColor: themeColor,
            borderColor: themeColor,
            tension: 0.3,
            fill: true,
            borderWidth: 4,
      }
      
      for (const [name, day] of Object.entries(interactionsByNameAndDay)) {
        monthlyLabelArr = Object.keys(day).filter((key, index, self) => self.indexOf(key) === index);
        const dataSet = {
            label: `${name.charAt(0).toUpperCase()}${name.replace(/^./, "").replace(/([a-z](?=[A-Z]))/g, '$1 ')}`,
            data: Object.values(interactionsByNameAndDay[name]),
            ...dataTheme
        }
        monthlyDataArr.push(dataSet);
      }

      for (const [name, hour] of Object.entries(interactionsByNameDayHour)) {
        dailyLabelArr = Object.keys(hour).filter((key, index, self) => self.indexOf(key) === index);
        const dataSet = {
            label: `${name.charAt(0).toUpperCase()}${name.replace(/^./, "").replace(/([a-z](?=[A-Z]))/g, '$1 ')}`,
            data: Object.values(interactionsByNameDayHour[name]),
            ...dataTheme
        }
        dailyDataArr.push(dataSet);
      }

    const monthlyData = {
        labels: monthlyLabelArr,
        datasets: monthlyDataArr
    };

    const dailyData = {
        labels: dailyLabelArr,
        datasets: dailyDataArr
    }

    const options = {
        plugins: {
            legend: {
                display: true,
            },
            Tooltip: {
                display: true,
            },
        }
    }

    return (
      <div>
      {graphModeProp === "daily" ? (
        <div>
          < Line
            data={dailyData}
            options={options} 
            >
          </Line>
        </div>  
      ) : (
        <div>
          <Line
            data={monthlyData}
            options={options}
            >
          </Line> 
        </div>
      )}
     </div>
    )
}

export default LinearChart;
