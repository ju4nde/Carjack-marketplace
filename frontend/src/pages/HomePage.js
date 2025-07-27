import React, { useState, useEffect } from 'react';
import DesktopMenuBar from '../components/DesktopMenuBar';
import ShowCar from '../components/ShowCar';
import CarModelModal from '../components/CarModelModal';


const HomePage = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const justRegistered = localStorage.getItem("justRegistered"); //If a user just registered, "justregistered" is stored in localstorage as true
    if (justRegistered === "true") {
      setShowModal(true);             //Modal to pick what car they would be looking parts for
      localStorage.removeItem("justRegistered"); 
    }
  }, []);


  return (
    <div>
      <div className="header">
        <div>
          <DesktopMenuBar setSearchResults={setSearchResults} />
        </div>
        <div>
          <ShowCar results={searchResults} />
        </div>
        <div>
        {showModal && <CarModelModal onClose={() => setShowModal(false)} />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;