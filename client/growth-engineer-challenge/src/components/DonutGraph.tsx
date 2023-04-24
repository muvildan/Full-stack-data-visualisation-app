// import Loader from "./Loader";
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
  };

  interface InteractionData {
      [key: string]: number;
  }

function DonutGraph({ allMetrics }: Props) {

  const interactionsByName: InteractionData = {};

    allMetrics.forEach((interaction) => {
        const name = interaction.name;
      
        if (!interactionsByName[name]) {
          interactionsByName[name] = 1;
        } else {
          interactionsByName[name]++;
        }
      });

      const labelsArr = Object.keys(interactionsByName);
      const formattedLabelsArr: string[] = [];
      labelsArr.forEach((label) => {
          label = `${label.charAt(0).toUpperCase()}${label.replace(/^./, "").replace(/([a-z](?=[A-Z]))/g, '$1 ')}`;
          if (!formattedLabelsArr.includes(label)) {
              formattedLabelsArr.push(label);
          }
      })

      

  const data = {
    labels: formattedLabelsArr,
    datasets: [
      {
        label: 'Interactions',
        data: Object.values(interactionsByName),
        backgroundColor: [
          'rgba(50, 60, 168, 0.2)',
          'rgba(168, 166, 50, 0.2)',
          'rgba(168, 86, 50, 0.2)',
          'rgba(88, 168, 50, 0.2)',
          'rgba(151, 50, 168, 0.2)',
          'rgba(50, 168, 155, 0.2)'
        ],
        borderColor: [
          'rgba(50, 60, 168, 0.2)',
          'rgba(168, 166, 50, 0.2)',
          'rgba(168, 86, 50, 0.2)',
          'rgba(88, 168, 50, 0.2)',
          'rgba(151, 50, 168, 0.2)',
          'rgba(50, 168, 155, 0.2)'
        ],
        borderWidth: 3,
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
}

    return (
        <div>
        < Doughnut 
          data={data}
          options={options}
          >
        </Doughnut>
        </div>
    );
}

export default DonutGraph;