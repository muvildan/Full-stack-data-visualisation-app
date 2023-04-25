import { useEffect, useState } from 'react';
import { DayPicker, DayClickEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface Props {
  changeGraphMode: (graphSwitch: string) => void;
  getSelectedDate: (dateSwitch: Date) => void;
  onDateChange: (date: Date) => void;
}

const styledComponent = `
  .my-selected { 
    font-weight: bold; 
    border: 2px solid currentColor;
    color: light-red;
  }
`;

function DatePicker({changeGraphMode, getSelectedDate, onDateChange} : Props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    useEffect(() => {
      selectedDate ? changeGraphMode("daily") : changeGraphMode("monthly");
    }, [changeGraphMode, selectedDate]);
      
    const handleDateChange: DayClickEventHandler = (date: Date) => {
      setSelectedDate(date);
      onDateChange(date);
    }

    return (
        <div>
          <style>{styledComponent}</style>
          <DayPicker 
          mode="single"
          selected={selectedDate}
          onDayClick={handleDateChange}
          modifiersClassNames={{
            selected: 'my-selected',
            hover: 'hover'
          }}
          />
        </div>
    );
};


export default DatePicker;
