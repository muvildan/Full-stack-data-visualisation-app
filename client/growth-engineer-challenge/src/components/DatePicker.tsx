import { useEffect, useState } from 'react';
import PickTheDay from 'react-datepicker';

interface Props {
  changeGraphMode: (graphSwitch: string) => void;
}

function DatePicker({changeGraphMode}: Props) {
    const [date, setDate] = useState(new Date());
    
    useEffect(() => {
      date ? changeGraphMode("daily") : changeGraphMode("monthly");
    }, [changeGraphMode, date]);

    return (
        <div>
        <PickTheDay 
        selected={date} 
        onChange={(date: Date) => setDate(date)}
        />
        </div>
    );
}

export default DatePicker;
