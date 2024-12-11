import React, { useState, useEffect } from "react";
import axios from "axios";
import {Footer} from './Footer';
import "../styles.css";

const TurfOwners = () => {
    const [turfOwners, setTurfOwners] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/turf-owners") // Replace with your backend API
            .then((response) => setTurfOwners(response.data))
            .catch((error) => console.error("Error fetching turf owners:", error));
    }, []);

    return (
        <div className="data-container">
            <h2>Turf Owners</h2>
            {turfOwners.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turfOwners.map((owner) => (
                            <tr key={owner.id}>
                                <td>{owner.name}</td>
                                <td>{owner.email}</td>
                                <td>{owner.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available.</p>
            )}
            <Footer/>
        </div>
    );
};

export default TurfOwners;
