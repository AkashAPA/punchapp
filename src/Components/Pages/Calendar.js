import React, { useState, useEffect } from 'react';
import Input from '@mui/material/Input';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ selectedDate, onDateChange }) => {
    const [displayDate, setDisplayDate] = useState(selectedDate);

    useEffect(() => {
        setDisplayDate(selectedDate);
    }, [selectedDate]);

  

    const handleInputChange = (event) => {
        const inputDate = new Date(event.target.value);
        if (!isNaN(inputDate)) {
            onDateChange(inputDate);
            setDisplayDate(inputDate);
        }
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('en-CA', options); // Format to yyyy-mm-dd for TextField input
    };

    return (
        <div className="calendar" style={{ display: 'flex', alignItems: 'center' , marginTop:20}}>
            <span style={{ marginRight: '10px' }}>Show Punches on:</span>
            <Input
                type="date"
                value={formatDate(displayDate)}
                onChange={handleInputChange}
                variant="outlined"
                style={{ width: '150px' }}
                InputProps={{
                    style: {
                        padding: '10px',
                        fontSize: '0.875rem', // Adjust the font size if necessary
                    }
                }}
            />
            
        </div>
    );
};

export default Calendar;
