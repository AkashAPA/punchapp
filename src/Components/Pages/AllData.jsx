import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { DataContext } from '../../DataContext'; // Correct import path
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AllData = () => {
    const { allData } = useContext(DataContext);
    const [groupedPunchData, setGroupedPunchData] = useState({});
    const [summaryData, setSummaryData] = useState([]);

    useEffect(() => {
        if (allData && allData.punchData) {
            const groupedData = groupPunchDataByDate(allData.punchData);
            setGroupedPunchData(groupedData);
            const summary = generateCheckInOutSummary(groupedData);
            setSummaryData(summary);

            // Find and log all punches for employee ID 001 on Sunday, July 28, 2024
            const specificDate = 'Sunday, July 28, 2024'; // Adjusting to match the given date format
            const specificPunches = allData.punchData.filter(punch =>
                punch.empId === '001' && punch.dateOfPunch === specificDate
            );
            console.log('Punches for employee 001 on Sunday, July 28, 2024:', specificPunches);
        }
    }, [allData]);

    const groupPunchDataByDate = (punchData) => {
        return punchData.reduce((acc, punch) => {
            const key = `${punch.empId}-${punch.dateOfPunch}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(punch);
            return acc;
        }, {});
    };

    const generateCheckInOutSummary = (groupedData) => {
        const summary = [];

        Object.keys(groupedData).forEach(key => {
            const punches = groupedData[key];
            const sortedPunches = punches.sort((a, b) => new Date(`${a.dateOfPunch} ${a.timeOfPunch}`) - new Date(`${b.dateOfPunch} ${b.timeOfPunch}`));
            const firstPunchIn = sortedPunches.find(punch => punch.status === 'Punch In');
            const lastPunchOut = sortedPunches.reverse().find(punch => punch.status === 'Punch Out');

            const empId = punches[0].empId;
            const name = `${punches[0].firstName} ${punches[0].lastName}`;
            const date = punches[0].dateOfPunch;

            summary.push({
                empId,
                name,
                date,
                firstPunchIn: firstPunchIn ? firstPunchIn.timeOfPunch : 'Punch Missing',
                lastPunchOut: lastPunchOut ? lastPunchOut.timeOfPunch : 'Punch Missing',
                status: (firstPunchIn && lastPunchOut) ? 'Present' : 'Absent'
            });
        });

        return summary;
    };

    return (
        <>
            <Navbar />
            <div className="row">
                <div className="col-md-12">

                    <h5 className='text-center'>All Employees Punches</h5>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="Punch Data Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(groupedPunchData).map((key) => (
                            groupedPunchData[key].map((punch, index) => (
                                <TableRow key={index}>
                                    <TableCell>{punch.empId}</TableCell>
                                    <TableCell>{`${punch.firstName} ${punch.lastName}`}</TableCell>
                                    <TableCell>{punch.dateOfPunch}</TableCell>
                                    <TableCell>{punch.timeOfPunch}</TableCell>
                                    <TableCell>{punch.status}</TableCell>
                                </TableRow>
                            ))
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="row">
                <div className="col-md-12">

                    <h5 className='text-center'>Punches</h5>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="Summary Data Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>First Punch In</TableCell>
                            <TableCell>Last Punch Out</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {summaryData.length > 0 ? (
                            summaryData.map((record, index) => (
                                <TableRow key={index}>
                                    <TableCell>{record.empId}</TableCell>
                                    <TableCell>{record.name}</TableCell>
                                    <TableCell>{record.date}</TableCell>
                                    <TableCell>{record.firstPunchIn}</TableCell>
                                    <TableCell>{record.lastPunchOut}</TableCell>
                                    <TableCell>{record.status}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No records to display.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default AllData;
