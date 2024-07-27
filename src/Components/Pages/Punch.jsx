import React, { useState, useEffect, useContext } from 'react';
import './Punch.css';
import ControlledAccordions from './PriousPunches';
import { DataContext } from '../../DataContext';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AlarmOnIcon from '@mui/icons-material/AlarmOn'; // Icon for Punch In
import AlarmOffIcon from '@mui/icons-material/AlarmOff'; // Icon for Punch Out

const Punch = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { allData, currentUser } = useContext(DataContext);
    const [punchData, setPunchData] = useState(allData ? allData.punchData : []);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredPunches, setFilteredPunches] = useState([]);
    const [openCalendarDialog, setOpenCalendarDialog] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, []);

    useEffect(() => {
        // Filter punches for the current user and selected date
        filterPunchesByDate(selectedDate);
    }, [punchData, selectedDate]);

    const formatDate = (date) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (date) => {
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        return date.toLocaleTimeString('en-US', options);
    };

    const handlePunch = async (status) => {
        const newPunch = {
            empId: currentUser.empId,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            dateOfPunch: formatDate(currentTime),
            timeOfPunch: formatTime(currentTime),
            status: status,
        };

        try {
            const response = await axios.post('https://punchdata.onrender.com/allData', {
                ...allData,
                punchData: [...punchData, newPunch],
            });
            setPunchData([...punchData, newPunch]);
        } catch (error) {
            console.error('Error saving punch data:', error);
        }
    };

    // Filter punchData based on the selected date
    const filterPunchesByDate = (date) => {
        const formattedDate = formatDate(date);
        const punchesForDate = punchData.filter(punch => punch.empId === currentUser.empId && punch.dateOfPunch === formattedDate);
        setFilteredPunches(punchesForDate);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (date) {
            filterPunchesByDate(date);
        } else {
            setFilteredPunches([]);
        }
        setOpenCalendarDialog(false);
    };

    // Default to today's punches if no date is selected
    const todayDate = formatDate(new Date());
    const userPunches = punchData.filter(punch => punch.empId === currentUser.empId && punch.dateOfPunch === todayDate);

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="date">
                        <h6>{formatDate(currentTime)}</h6>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="time">
                        <h5>{formatTime(currentTime)}</h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="punchInOutBtns">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AlarmOnIcon />}
                            onClick={() => handlePunch('Punch In')}
                            className='mx-2'
                        >
                            Punch In
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<AlarmOffIcon />}
                            onClick={() => handlePunch('Punch Out')}
                        >
                            Punch Out
                        </Button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="calendar">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CalendarTodayIcon />}
                            onClick={() => setOpenCalendarDialog(true)}
                            style={{ marginTop: '20px' }}
                        >
                            Select Date
                        </Button>
                        <Dialog
                            open={openCalendarDialog}
                            onClose={() => setOpenCalendarDialog(false)}
                            maxWidth="xs" // Small size dialog
                            fullWidth
                            PaperProps={{
                                style: {
                                    maxWidth: '300px', // Adjust this value to fit the calendar
                                    minWidth: '300px',
                                },
                            }}
                        >
                            <DialogTitle>Select a Date</DialogTitle>
                            <DialogContent>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat="MM/dd/yyyy"
                                        inline
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 spp m-sm-5">
                    <ControlledAccordions punchData={filteredPunches.length > 0 ? filteredPunches : userPunches} />
                </div>
            </div>
        </>
    );
}

export default Punch;
