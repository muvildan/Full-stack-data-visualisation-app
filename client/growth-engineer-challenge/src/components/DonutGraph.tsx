/* eslint-disable @typescript-eslint/no-unused-vars */
// import Loader from "./Loader";
import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(
  ArcElement,
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
      [key: string]: number;
  }

function metricsCounter(dataset: Data[]): InteractionData {
  const interactions: InteractionData = {};

  dataset.forEach((interaction) => {
    const name = interaction.name;
  
    if (!interactions[name]) {
      interactions[name] = 1;
    } else {
      interactions[name]++;
    }
  });

  return interactions;
}

function DonutGraph({ allMetrics, graphModeProp, selectedDateProp }: Props) {
  const [interactionsByName, setInteractionsByName] = useState<InteractionData>({});
  const [interactionsByNameAndDay, setInteractionsByNameAndDay] = useState<InteractionData>({});
  const [selectedDate, setSelectedDate] = useState(selectedDateProp);

  useEffect(() => {
    setInteractionsByName(metricsCounter(allMetrics));
  }, [allMetrics]);


  useEffect(() => {
    if (selectedDateProp) {
      setSelectedDate(selectedDateProp);
    }
  }, [selectedDateProp]);

  useEffect(() => {
    if (selectedDateProp) {

      const filteredData = allMetrics.filter((event) => {
        const eventDate = new Date(event.timeStamp);
        return eventDate.getUTCDate().toString() === selectedDateProp.getUTCDate().toString();
      });
      setInteractionsByNameAndDay(metricsCounter(filteredData));
    } else {
      setInteractionsByNameAndDay({});
    }
  }, [selectedDateProp, allMetrics]);

  let interactionsByNameData: InteractionData = {};
  if (graphModeProp === "monthly") {
    interactionsByNameData = interactionsByName;
  } else if (graphModeProp === "daily") {
    interactionsByNameData = interactionsByNameAndDay;
  }

      const labelsArr = Object.keys(interactionsByName);
      const formattedLabelsArr: string[] = [];

      labelsArr.forEach((label) => {
          label = `${label.charAt(0).toUpperCase()}${label.replace(/^./, "").replace(/([a-z](?=[A-Z]))/g, '$1 ')}`;
          if (!formattedLabelsArr.includes(label)) {
              formattedLabelsArr.push(label);
          }
      })

    const themeColor = [
      'rgba(50, 60, 168, 0.7)',
      'rgba(168, 166, 50, 0.7)',
      'rgba(168, 86, 50, 0.7)',
      'rgba(88, 168, 50, 0.7)',
      'rgba(151, 50, 168, 0.7)',
      'rgba(50, 168, 155, 0.7)'
    ]
      
    const monthlyData = {
      labels: formattedLabelsArr,
      datasets: 
      [
        {
          label: 'Interactions',
          data: Object.values(interactionsByName),
          backgroundColor: themeColor,
          borderColor: themeColor,
          borderWidth: 4,
        },
      ],
    };

    const dailyData = {
      labels: formattedLabelsArr,
      datasets:
      [
        {
          label: 'Interactions',
          data: Object.values(interactionsByNameAndDay),
          backgroundColor: themeColor,
          borderColor: themeColor,
          borderWidth: 4,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: true,
        },
        Tooltip: {
          display: true,
        },
      }
    };

    return (
      <div>
      {graphModeProp === "daily" ? (
        <div>
          < Doughnut
            data={dailyData}
            options={options} 
            >
          </Doughnut>
        </div>  
      ) : (
        <div>
          < Doughnut
            data={monthlyData}
            options={options}
            >
          </Doughnut> 
        </div>
      )}
     </div>
    )
}

export default DonutGraph;