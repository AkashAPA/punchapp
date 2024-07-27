import React, { useContext } from 'react';
import Navbar from '../Navbar.jsx';
import { DataContext } from '../../DataContext';
import Punch from './Punch.jsx';

const Home = () => {
  const { currentUser, allData } = useContext(DataContext);

  return (
    <>
      <Navbar currentUser={currentUser} />
        <Punch/>
         {/* Render your data here */}
      {/* <pre>{JSON.stringify(allData, null, 2)}</pre> */}
    </>
  );
}

export default Home;
