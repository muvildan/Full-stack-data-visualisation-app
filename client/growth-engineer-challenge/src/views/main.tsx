import { useState, useEffect } from 'react';
import DonutGraph from '../components/DonutGraph';
import LinearChart from '../components/LinearChart';
import DatePicker from '../components/DatePicker';

type Metric = {
    timeStamp: string;
    name: string;
    value: boolean;
  };

function Main() {
    
    const [data, setData] = useState<Metric[]>([{timeStamp: "", name: "", value: false }]);
    const [graphMode, setGraphMode] = useState("monthly")

    function changeGraphMode(graphSwitch: string){
        setGraphMode(graphSwitch);
        console.log(graphMode);
    }

    useEffect(() => {
        fetch('http://localhost:8080/api/metrics')
        .then(response => response.json())
        .then(data => {
            setData(data);
        });
    }, []);

    return(
        <div>
            <h1>Metrics for XYZ job.</h1>
            <div>
                <div>
                    <div>
                        <DonutGraph allMetrics={data}/>
                    </div>
                </div>
                <div>
                    <DatePicker changeGraphMode={changeGraphMode} />
                    <DonutGraph allMetrics={data}/>
                </div>
                <div>
                    <LinearChart allMetrics={data} />
                </div>
                <div>
                    <LinearChart allMetrics={data}/>
                </div>
            </div>
        </div>
    )
}

export default Main;