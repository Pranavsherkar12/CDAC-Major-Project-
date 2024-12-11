import React, { useState } from 'react';
import './TurfPg.css';
import { useNavigate } from 'react-router-dom';

const ManageTurf = ({ addTurf }) => {
  const [turfName, setTurfName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Booked');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Validate Turf Name and Date
  const validateForm = () => {
    let formErrors = {};

    if (!turfName || turfName.length < 5) {
      formErrors.turfName = 'Turf name must not be empty and should be at least 5 characters long';
    }

    const today = new Date().toISOString().split('T')[0];
    if (!date || date <= today) {
      formErrors.date = 'Please select a future date!';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const newTurf = {
      name: turfName,
      date,
      time,
      price,
      status,
    };

    // Store the new turf in localStorage
    const storedTurfs = JSON.parse(localStorage.getItem('turfList')) || [];
    const updatedTurfs = [...storedTurfs, newTurf];
    localStorage.setItem('turfList', JSON.stringify(updatedTurfs));

    addTurf(newTurf);

    setTurfName('');
    setDate('');
    setTime('');
    setPrice('');
    setStatus('Booked');
    setErrors({});
    alert('Turf details saved successfully!');
  };

  const handleReset = () => {
    setTurfName('');
    setDate('');
    setTime('');
    setPrice('');
    setStatus('Booked');
    setErrors({});
  };

  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Turf Name:</label>
          <input
            type="text"
            value={turfName}
            onChange={(e) => setTurfName(e.target.value)}
          />
          {errors.turfName && <span className="error">{errors.turfName}</span>}
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label>Time:</label>
          <input
            type="text"
            placeholder="e.g., 6:00 AM - 8:00 AM"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            placeholder="Enter price in INR"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {/* <div className="button-group">
          <button id="" type="button" onClick={() => navigate('/manage-turf-list')}>
            Turf List
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default ManageTurf;
