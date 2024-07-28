import React, { useState, useEffect, useContext, useCallback } from 'react';
import './Punch.css';
import ControlledAccordions from './PriousPunches';
import { DataContext } from '../../DataContext';
import axios from 'axios';
import Button from '@mui/material/Button';
import AlarmOnIcon from '@mui/icons-material/AlarmOn'; // Icon for Punch In
import AlarmOffIcon from '@mui/icons-material/AlarmOff'; // Icon for Punch Out
import Calendar from './Calendar'; // Import the new Calendar component

const Punch = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { allData, currentUser, setAllData } = useContext(DataContext); // Added setAllData to context
    const [punchData, setPunchData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredPunches, setFilteredPunches] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, []);

    const fetchPunchData = useCallback(async () => {
        try {
            const response = await axios.get('https://punchdata.onrender.com/allData');
            const allData = response.data;
            setPunchData(allData.punchData);
            setAllData(allData); // Update the context data
        } catch (error) {
            console.error('Error fetching punch data:', error);
        }
    }, [setAllData]);

    useEffect(() => {
        fetchPunchData(); // Fetch punch data on component mount
    }, [fetchPunchData]);

    const filterPunchesByDate = useCallback((date) => {
        if (!currentUser) return;
        const formattedDate = formatDate(date);
        const punchesForDate = punchData.filter(punch => punch.empId === currentUser.empId && punch.dateOfPunch === formattedDate);
        setFilteredPunches(punchesForDate);
    }, [currentUser, punchData]);

    useEffect(() => {
        // Filter punches for the current user and selected date
        filterPunchesByDate(selectedDate);
    }, [punchData, selectedDate, filterPunchesByDate]);

    const formatDate = (date) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (date) => {
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        return date.toLocaleTimeString('en-US', options);
    };

    const handlePunch = async (status) => {
        if (!currentUser) return;
        const newPunch = {
            empId: currentUser.empId,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            dateOfPunch: formatDate(currentTime),
            timeOfPunch: formatTime(currentTime),
            status: status,
        };

        try {
            await axios.post('https://punchdata.onrender.com/allData', {
                ...allData,
                punchData: [...punchData, newPunch],
            });
            setPunchData([...punchData, newPunch]);
        } catch (error) {
            console.error('Error saving punch data:', error);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (date) {
            filterPunchesByDate(date);
        } else {
            setFilteredPunches([]);
        }
    };

    // Default to today's punches if no date is selected
    // eslint-disable-next-line
    const todayDate = formatDate(new Date());
    // eslint-disable-next-line
    const userPunches = currentUser
        ? punchData.filter(punch => punch.empId === currentUser.empId && punch.dateOfPunch === todayDate)
        : [];

    return (
        <>
        <div className="container">
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
                    <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 spp m-sm-5 ">
                    <ControlledAccordions punchData={filteredPunches} />
                </div>
            </div>
            </div>
        </>
    );
}

export default Punch;
