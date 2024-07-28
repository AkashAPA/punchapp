import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [allData, setAllData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://punchdata.onrender.com/allData');
                setAllData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Retrieve currentUser from localStorage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const updateCurrentUser = (user) => {
        setCurrentUser(user);
        // Store currentUser in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
    };

    return (
        <DataContext.Provider value={{ allData, loading, currentUser, updateCurrentUser ,setAllData}}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
