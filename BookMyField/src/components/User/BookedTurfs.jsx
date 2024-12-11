
// src/components/User/BookedTurfs.jsx
import React, { useEffect, useState } from 'react';
import ManageTurfList from '../Booking/ManageTurfList'; // Import the ManageTurfList component

const BookedTurfs = () => {
  const [turfList, setTurfList] = useState([]);

  useEffect(() => {
    // Retrieve the stored turfs from localStorage
    const storedTurfs = JSON.parse(localStorage.getItem('turfList')) || [];
    setTurfList(storedTurfs);
  }, []);

  const updateTurfList = (updatedList) => {
    setTurfList(updatedList);
    localStorage.setItem('turfList', JSON.stringify(updatedList)); // Update localStorage
  };

  return (
    <div className="booked-turfs">
      <h1>Your Booked Turfs</h1>
      {turfList.length === 0 ? (
        <p>No turfs booked yet.</p>
      ) : (
        <ManageTurfList turfList={turfList} updateTurfList={updateTurfList} />
      )}
    </div>
  );
};

export default BookedTurfs;