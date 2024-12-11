import React, { useState, useEffect } from "react";
import axios from "axios";
import {Footer} from './Footer';
import "../styles.css";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(""); // For error handling

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/customers") // Backend API for fetching customers
            .then((response) => setCustomers(response.data))
            .catch((error) => {
                console.error("Error fetching customers:", error);
                setError("Unable to fetch customer data. Please try again later.");
            });
    }, []);

    return (
        <div className="data-container">
            <h2>All Customers</h2>
            {error && <p className="error-message">{error}</p>} {/* Display error if any */}
            {customers.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Turf Booked</th> {/* New column for Turf Booked */}
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.turfBooked || "None"}</td> {/* Display turf booked if exists */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No customers available yet.</p>

            )}
            <Footer/>
        </div>
    );
};

export default Customers;
