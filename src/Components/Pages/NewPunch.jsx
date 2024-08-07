import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { DataContext } from '../../DataContext'; // Correct import path
import axios from 'axios';
import './NewPunch.css';

const NewPunch = () => {
    const { allData, currentUser, setAllData } = useContext(DataContext); // Assuming currentUser is available
    const [latestPunches, setLatestPunches] = useState({
        punchIn: 'Not Available',
        punchOut: 'Not Available'
    });
    const [currentTime, setCurrentTime] = useState(new Date());
    const [workedHours, setWorkedHours] = useState('Not Available');

    useEffect(() => {
        // Update the current time every second
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, []);

    useEffect(() => {
        if (allData && allData.punchData && currentUser) {
            const userPunches = allData.punchData.filter(punch => punch.empId === currentUser.empId);
            const todayDate = formatDate(new Date());
            const punchesToday = userPunches.filter(punch => punch.dateOfPunch === todayDate);

            const sortedPunches = punchesToday.sort((a, b) => new Date(`${a.dateOfPunch} ${a.timeOfPunch}`) - new Date(`${b.dateOfPunch} ${b.timeOfPunch}`));
            const firstPunchIn = sortedPunches.find(punch => punch.status === 'Punch In');
            const lastPunchOut = sortedPunches.reverse().find(punch => punch.status === 'Punch Out');

            setLatestPunches({
                punchIn: firstPunchIn ? formatTimeWithoutSeconds(new Date(`${firstPunchIn.dateOfPunch} ${firstPunchIn.timeOfPunch}`)) : '--:--',
                punchOut: lastPunchOut ? formatTimeWithoutSeconds(new Date(`${lastPunchOut.dateOfPunch} ${lastPunchOut.timeOfPunch}`)) : '--:--'
            });

            // Calculate worked hours
            if (firstPunchIn && lastPunchOut) {
                const punchInTime = new Date(`${firstPunchIn.dateOfPunch} ${firstPunchIn.timeOfPunch}`);
                const punchOutTime = new Date(`${lastPunchOut.dateOfPunch} ${lastPunchOut.timeOfPunch}`);
                const diffMs = punchOutTime - punchInTime;
                const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
                const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                setWorkedHours(`${diffHrs}h ${diffMins}m`);
            } else {
                setWorkedHours('--h --m');
            }
        }
    }, [allData, currentUser, currentTime]);

    const formatDate = (date) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTimeWithoutSeconds = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatTimeForAPI = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        return `${hours}:${minutes}:${seconds} ${ampm}`;
    };

    const getSystemTimeZone = () => {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    };

    const handlePunch = async (status) => {
        if (!currentUser) return;

        const newPunch = {
            empId: currentUser.empId,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            dateOfPunch: formatDate(currentTime),
            timeOfPunch: formatTimeForAPI(currentTime),
            status: status,
        };

        try {
            await axios.post('https://punchdata.onrender.com/allData', {
                ...allData,
                punchData: [...allData.punchData, newPunch],
            });
            setAllData(prev => ({
                ...prev,
                punchData: [...prev.punchData, newPunch],
            }));
        } catch (error) {
            console.error('Error saving punch data:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="row">
                <div className="col-md-12">
                    <div className="MainContainer">
                        <div className="Box">
                            <div className="header">
                                <div className="attendance">
                                    <span className='AttendanceText'>Attendance</span>
                                </div>
                                <div className="viewHistory">
                                    <span>View History</span>
                                </div>
                            </div>

                            {/* Date and Time display */}
                            <div className="sBox">
                                <div className="dateTime">
                                    <div className="dateS">
                                        <span>{formatDate(currentTime)}</span>
                                    </div>
                                    <div className="imgTime">
                                        <div className="img"></div>
                                        <div className="timeB">
                                            <span className='timeBo'>{formatTimeWithoutSeconds(currentTime)}</span>
                                            <br />
                                            <span className='format'>{getSystemTimeZone()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Input/Output buttons */}
                                <div className="pIo">
                                    <div className="pIn">
                                        <button className="btn bg-success text-light" onClick={() => handlePunch('Punch In')}>
                                            <i className="fa-solid fa-arrow-right-to-bracket"></i> Punch In
                                        </button>
                                    </div>
                                    <div className="pOut">
                                        <button className="btn bg-danger text-light" onClick={() => handlePunch('Punch Out')}>
                                            <i className="fa-solid fa-right-from-bracket fa-flip-horizontal fa-sm"></i> Punch Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="punchDetails">
                                <div className="finger px-2">
                                    <i className="fa-solid fa-fingerprint"></i>
                                </div>
                                <div className="PiT">
                                    <div className="punchText">
                                        <span>Punch In</span>
                                    </div>
                                    <div className="PunchTime">
                                        <span className='timeF'>{latestPunches.punchIn}</span>
                                    </div>
                                </div>
                                <div className="PoT">
                                    <div className="punchText">
                                        <span>Punch Out</span>
                                    </div>
                                    <div className="PunchTime">
                                        <span className='timeF'>{latestPunches.punchOut}</span>
                                    </div>
                                </div>
                                <div className="wTime">
                                    <div className="punchText">
                                        <span><i className="fa-regular fa-clock"></i> Worked Time</span>
                                    </div>
                                    <div className="PunchTime">
                                        <span className='timeF px-4'>{workedHours}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="viewMActivities">
                                <span>View My Activity</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewPunch;
