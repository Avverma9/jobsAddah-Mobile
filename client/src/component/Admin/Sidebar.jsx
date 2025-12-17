import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Mi11Tpro from './mi11tpro.jsx';
import Mi11x from './mi11x.jsx';
import Tools from './tools.jsx';
import Recent from "./Recent.jsx";
import Requests from './Requests.jsx';
import './Sidebar.css';
import Rom from './rom.jsx';

const Sidebar = () => {
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState('Requests'); // Define and initialize the selectedOption state

  if (location.pathname !== '/av') {
    return null;
  }

  return (
    <div className='container-sidebar'>
      <div className='sidebar'>
        <ul>
          <li onClick={() => setSelectedOption('Requests')}>Requests</li>
          <li onClick={() => setSelectedOption('Recent Videos')}>Recent Videos</li>
          <li onClick={() => setSelectedOption('Mi11x')}>Mi11x</li>
          <li onClick={() => setSelectedOption('Tools')}>Tools</li>
          <li onClick={() => setSelectedOption('Mi11Tpro')}>Mi11Tpro</li>
         <li onClick={()=> setSelectedOption("Rom")}>Rom</li>
        </ul>
      </div>

      {selectedOption === 'Requests' ? (<Requests/>):null}
      {selectedOption === 'Tools' ? (<Tools/>) : null}
      {selectedOption === 'Recent Videos' ? (<Recent/>) : null}
      {selectedOption === 'Mi11x' ? (<Mi11x/>) : null}
      {selectedOption === 'Mi11Tpro' ? (<Mi11Tpro/>) : null}
      {selectedOption === "Rom" ? (<Rom/>):null}
    </div>
  );
};

export default Sidebar;
