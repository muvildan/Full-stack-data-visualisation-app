//import Loader from "./Loader";
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
  };

  interface InteractionData {
    [key: string]: {
      [key: string]: number;
    };
  }

function LinearChart({ allMetrics }: Props) {

    const interactionsByDayAndName: InteractionData = {};

    allMetrics.forEach((interaction) => {
        const date = new Date(interaction.timeStamp);
        const day = date.getUTCDate().toString();
        const name = interaction.name;
      
        if (!interactionsByDayAndName[name]) {
          interactionsByDayAndName[name] = {};
        }
      
        if (!interactionsByDayAndName[name][day]) {
          interactionsByDayAndName[name][day] = 1;
        } else {
          interactionsByDayAndName[name][day]++;
        }
      });

      const dataArr = [];
      let labelArr: string[] = [];

      for (const [name, day] of Object.entries(interactionsByDayAndName)) {
        labelArr = Object.keys(day).filter((key, index, self) => self.indexOf(key) === index);
        const colorRandomizer = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;
        const dataSet = {
            label: `${name.charAt(0).toUpperCase()}${name.replace(/^./, "").replace(/([a-z](?=[A-Z]))/g, '$1 ')}`,
            data: Object.values(interactionsByDayAndName[name]),
            borderColor: colorRandomizer,
            pointBorderColor: colorRandomizer,
            backgroundColor: colorRandomizer,
            tension: 0.3,
            fill: true,
            borderWidth: 4,
        }
        dataArr.push(dataSet);
      }

    const data = {
        labels: labelArr,
        datasets: dataArr
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
        <h1>Linear Chart</h1>
        <Line 
            data={data}
            options={options}
        >
        </Line>
        </div>
    );
}

export default LinearChart;