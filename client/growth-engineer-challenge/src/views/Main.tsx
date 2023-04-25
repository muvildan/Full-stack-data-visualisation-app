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
    const [graphMode, setGraphMode] = useState("monthly");
    const [selectedDate, setSelectedDate] = useState(new Date()); 

    function changeGraphMode(graphSwitch: string){
        setGraphMode(graphSwitch);
    }

    function getSelectedDate(dateSwitch: Date){
        setSelectedDate(dateSwitch);
    }

    function handleDateChange(date: Date) {
        setSelectedDate(date);
      }

    useEffect(() => {
        ;
    }, [selectedDate]);



    useEffect(() => {
        fetch('http://localhost:8080/api/metrics')
        .then(response => response.json())
        .then(data => {
            setData(data);
        });
    }, []);

    return (
        <div className="bg-gray-100 px-4 py-8">
          <h1 className="text-3xl font-bold ml-4 mb-4 text-start bg-white rounded-lg shadow p-5 ">Metrics for Growth Engineer role</h1>
          <div className="grid grid-cols-10 my-4 mx-7 gap-10">
            <div className="col-span-6">
              <div className="bg-white rounded-lg shadow p-5 content-center">
                <div className="mb-2">
                  <h2 className="text-lg font-bold">Monthly Doughnut 🍩</h2>
                </div>
                <div className="mb-4">
                  <div className="bg-gray-200 rounded-lg p-3 place-items-center">
                    <DonutGraph allMetrics={data} graphModeProp={"monthly"} selectedDateProp={selectedDate}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
                <div  className="bg-white rounded-lg p-1 pl-20 mb-4">
                    <DatePicker changeGraphMode={changeGraphMode} getSelectedDate={getSelectedDate} onDateChange={handleDateChange} />
                </div>
                <div className="bg-white rounded-lg shadow px-3 py-3">
                    <div className="mb-4">
                    <h2 className="text-lg font-bold">Daily Doughnut 🍩</h2>
                    </div>
                    <div className="mb-4">
                    <div className="bg-gray-200 rounded-lg p-5">
                        <DonutGraph allMetrics={data} graphModeProp={graphMode} key={selectedDate.toString()} selectedDateProp={selectedDate}/>
                    </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="my-8 mx-7">
            <div className="bg-white rounded-lg shadow px-4 py-4">
              <div className="mb-4">
                <h2 className="text-lg font-bold">Monthly Line Chart 📈</h2>
              </div>
              <div className="bg-gray-200 rounded-lg p-4">
                <LinearChart allMetrics={data} graphModeProp={"monthly"} selectedDateProp={selectedDate} />
              </div>
            </div>
          </div>
          <div className="my-8 mx-7">
            <div className="bg-white rounded-lg shadow px-4 py-4">
              <div className="mb-4">
                <h2 className="text-lg font-bold">Daily Line Chart 📈</h2>
              </div>
              <div className="bg-gray-200 rounded-lg p-4">
                <LinearChart allMetrics={data} graphModeProp={graphMode} key={selectedDate.toString()} selectedDateProp={selectedDate}/>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Main;