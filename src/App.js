import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataProvider from './DataContext';
import Login from './Components/LoginPage';
import Home from './Components/Pages/Home';
import Signup from './Components/Signup';
import AllData from './Components/Pages/AllData';
import NewPunch from './Components/Pages/NewPunch';

const App = () => {
    return (
        <DataProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Table" element={<AllData />} />
                    <Route path="/newPunch" element={<NewPunch />} />
                </Routes>
            </Router>
        </DataProvider>
    );
};

export default App;
