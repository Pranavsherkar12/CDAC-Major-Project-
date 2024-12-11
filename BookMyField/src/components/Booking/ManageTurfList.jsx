import React, { useState, useEffect } from 'react';

const ManageTurfList = ({ turfList, updateTurfList }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTime, setEditedTime] = useState('');
  const [editedDate, setEditedDate] = useState('');

  useEffect(() => {
    const storedTurfs = JSON.parse(localStorage.getItem('turfList')) || [];
    updateTurfList(storedTurfs);
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedDate(turfList[index].date);
    setEditedTime(turfList[index].time);
  };

  const handleSaveEdit = (index) => {
    const updatedTurfs = [...turfList];
    updatedTurfs[index].date = editedDate;
    updatedTurfs[index].time = editedTime;
    updateTurfList(updatedTurfs);
    localStorage.setItem('turfList', JSON.stringify(updatedTurfs));
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updatedTurfs = turfList.filter((_, i) => i !== index);
    updateTurfList(updatedTurfs);
    localStorage.setItem('turfList', JSON.stringify(updatedTurfs));
  };

  return (
    <div className="container">
      {turfList.length === 0 ? (
        <p>No turfs available. Please add some turfs from the Manage Turf page.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {turfList.map((turf, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{turf.name}</td>
                <td id='editdate'>
                  {editingIndex === index ? (
                    <input
                      type="date"
                      value={editedDate}
                      onChange={(e) => setEditedDate(e.target.value)}
                    />
                  ) : (
                    turf.date
                  )}
                </td>
                <td id='edittime'>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedTime}
                      onChange={(e) => setEditedTime(e.target.value)}
                    />
                  ) : (
                    turf.time
                  )}
                </td>
                <td>{turf.price}</td>
                <td>{turf.status}</td>
                <td>
                  {editingIndex === index ? (
                    <button onClick={() => handleSaveEdit(index)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageTurfList;
