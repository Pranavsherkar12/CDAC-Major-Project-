import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from './Footer';  // Update path if Footer is in 'components' folder
import "../styles.css";  // Assuming styles are one level up in the project directory

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <div className="hero-banner">
                <h1>Admin Dashboard</h1>
            </div>

            <div className="dashboard-grid">
                <div
                    className="dashboard-block"
                    onClick={() => navigate("/customers")}
                >
                    All Customers
                </div>
                <div
                    className="dashboard-block"
                    onClick={() => navigate("/bookings")}
                >
                    All Bookings
                </div>
                <div
                    className="dashboard-block"
                    onClick={() => navigate("/all-turfs")}  // Updated to match previous changes
                >
                    All Turfs
                </div>
                <div
                    className="dashboard-block"
                    onClick={() => navigate("/add-turf")}  // Updated to match previous changes
                >
                    Add Turf
                </div>
            </div>

            <div className="dashboard-info-section">
                <h3>Welcome to Turf Booking System</h3>
                <p>
                    Whether you're a passionate athlete, a weekend warrior, or just looking for some fun with friends, our platform simplifies the process of booking a turf. Browse and select from a wide array of top-quality turfs in your area. Once you've found the perfect one, booking is just a few clicks away!
                </p>
            </div>

            <div className="dashboard-info-section">
                <h3>Instant Booking & Premium Facilities</h3>
                <p>
                    Secure your favorite playing field faster and easier than ever before. From impeccably maintained, lush green playing surfaces to modern lighting systems, our facilities are designed for the ultimate sports experience.
                </p>
            </div>

            <Footer /> {/* Footer component */}
        </div>
    );
};

export default AdminDashboard;
