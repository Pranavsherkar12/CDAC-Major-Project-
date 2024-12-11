import React, { useState } from "react";
import { Footer } from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles for react-toastify
import "../styles.css";

const AddTurf = () => {
    const [turfData, setTurfData] = useState({
        category: "",
        name: "",
        city: "",
        description: "",
        price: "",
        imageFile: null,
        imagePreview: "",
    });

    const [errors, setErrors] = useState({
        category: "",
        name: "",
        city: "",
        description: "",
        price: "",
        imageFile: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTurfData((prevData) => {
            if (name === "category") {
                const prices = {
                    Cricket: 999,
                    Football: 1099,
                    Basketball: 1199,
                    Tennis: 850,
                };
                return {
                    ...prevData,
                    [name]: value,
                    price: prices[value] || "",
                };
            }
            return { ...prevData, [name]: value };
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate the file type (image) and size
            if (!file.type.startsWith("image/")) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    imageFile: "Please upload a valid image file.",
                }));
            } else if (file.size > 100 * 1024 * 1024) { // 100 MB in bytes
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    imageFile: "File size exceeds 100 MB. Please upload a smaller image.",
                }));
            } else {
                const reader = new FileReader();
                reader.onload = () => {
                    setTurfData((prevData) => ({
                        ...prevData,
                        imageFile: file,
                        imagePreview: reader.result,
                    }));
                };
                reader.readAsDataURL(file);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    imageFile: "", // Clear previous error
                }));
            }
        }
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Category validation
        if (!turfData.category) {
            newErrors.category = "Category is required.";
        }

        // Name validation: only letters allowed
        const nameRegex = /^[A-Za-z\s\-\_]+$/;
        if (!turfData.name || !nameRegex.test(turfData.name)) {
            newErrors.name = "Turf name is required and must contain only letters, spaces, hyphens, and underscores.";
        }

        // City validation: only letters allowed
        const cityRegex = /^[A-Za-z]+$/;
        if (!turfData.city || !cityRegex.test(turfData.city)) {
            newErrors.city = "City is required and must contain only letters.";
        }

        // Description validation
        if (!turfData.description || turfData.description.trim().length === 0) {
            newErrors.description = "Description is required and cannot be empty.";
        }

        // Price validation
        if (!turfData.price) {
            newErrors.price = "Price is required.";
        }

        // Image validation
        if (!turfData.imageFile) {
            newErrors.imageFile = "Image is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); // Set the error messages
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form before submitting
        if (!validateForm()) return;

        const existingTurfs = JSON.parse(localStorage.getItem("turfs")) || [];

        const turfEntry = {
            ...turfData,
            imageFile: undefined, // Exclude image file from being saved in localStorage
        };

        localStorage.setItem("turfs", JSON.stringify([...existingTurfs, turfEntry]));

        // Show success toast instead of alert
        toast.success("Turf added successfully!");

        // Reset form after successful submission
        setTurfData({
            category: "",
            name: "",
            city: "",
            description: "",
            price: "",
            imageFile: null,
            imagePreview: "",
        });
        setErrors({}); // Reset errors after successful submission
    };

    return (
        <div className="form-container">
            <h2>Add Turf</h2>
            <form onSubmit={handleSubmit}>
                {/* Category */}
                <label htmlFor="category">Turf Category:</label>
                <select
                    id="category"
                    name="category"
                    value={turfData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select Category</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Basketball">Basketball</option>
                </select>
                {errors.category && <p className="error">{errors.category}</p>}

                {/* Price (read-only, based on category) */}
                <label htmlFor="price">Price (per hour):</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={turfData.price}
                    readOnly
                />
                {errors.price && <p className="error">{errors.price}</p>}

                {/* Turf Name */}
                <label htmlFor="name">Turf Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={turfData.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && <p className="error">{errors.name}</p>}

                {/* City */}
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={turfData.city}
                    onChange={handleChange}
                    required
                />
                {errors.city && <p className="error">{errors.city}</p>}

                {/* Description */}
                <label htmlFor="description">Turf Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={turfData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                />
                {errors.description && <p className="error">{errors.description}</p>}

                {/* Image Upload */}
                <label htmlFor="imageFile">Upload Turf Image:</label>
                <input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                {errors.imageFile && <p className="error">{errors.imageFile}</p>}
                {turfData.imagePreview && (
                    <div>
                        <p>Image Preview:</p>
                        <img
                            src={turfData.imagePreview}
                            alt="Turf Preview"
                            className="turf-image"
                        />
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit">Add Turf</button>
            </form>
            {/* Toast Notifications */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeButton={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover />
            <Footer />
        </div>
    );
};

export default AddTurf;
