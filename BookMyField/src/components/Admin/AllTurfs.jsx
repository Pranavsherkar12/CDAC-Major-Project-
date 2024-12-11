import React, { useState, useEffect } from "react";
import { Footer } from "./Footer";
import "../styles.css"; // Ensure the correct path to your CSS file

const AllTurfs = () => {
  const [turfs, setTurfs] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the row being edited
  const [editedTurf, setEditedTurf] = useState({
    category: "",
    name: "",
    city: "",
    description: "",
    imagePreview: "",
  });

  useEffect(() => {
    const storedTurfs = JSON.parse(localStorage.getItem("turfs")) || [];
    setTurfs(storedTurfs);
  }, []);

  const handleDelete = (index) => {
    const updatedTurfs = turfs.filter((_, i) => i !== index);
    localStorage.setItem("turfs", JSON.stringify(updatedTurfs));
    setTurfs(updatedTurfs);
  };

  const handleEdit = (index) => {
    const turfToEdit = turfs[index];
    setEditIndex(index);
    setEditedTurf({ ...turfToEdit });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTurf((prevTurf) => ({
      ...prevTurf,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedTurfs = turfs.map((turf, index) =>
      index === editIndex ? editedTurf : turf
    );
    localStorage.setItem("turfs", JSON.stringify(updatedTurfs));
    setTurfs(updatedTurfs);
    setEditIndex(null); // Reset edit mode
  };

  const handleCancel = () => {
    setEditIndex(null); // Cancel editing
  };

  return (
    <div className="all-turfs-container">
      <h2 className="all-turfs-header">All Turfs</h2>
      {turfs.length > 0 ? (
        <table className="all-turfs-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>City</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th> {/* Added actions column */}
            </tr>
          </thead>
          <tbody>
            {turfs.map((turf, index) => (
              <tr key={index}>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="category"
                      value={editedTurf.category}
                      onChange={handleChange}
                    />
                  ) : (
                    turf.category
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="name"
                      value={editedTurf.name}
                      onChange={handleChange}
                    />
                  ) : (
                    turf.name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="city"
                      value={editedTurf.city}
                      onChange={handleChange}
                    />
                  ) : (
                    turf.city
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <textarea
                      name="description"
                      value={editedTurf.description}
                      onChange={handleChange}
                    />
                  ) : (
                    turf.description
                  )}
                </td>
                <td>
                  {turf.imagePreview ? (
                    <img
                      src={turf.imagePreview}
                      alt={turf.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <>
                      <button
                        className="action-button save-button"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="action-button cancel-button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="action-button edit-button"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>{" "}
                {/* Added Edit and Delete buttons */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No turfs added yet.</p>
      )}
      <Footer />
    </div>
  );
};

export default AllTurfs;
