import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/customers">All Customers</Link></li>
                <li><Link to="/bookings">All Bookings</Link></li>
                <li><Link to="/add-turf">Add Turf</Link></li> {/* Changed from Add Ground */}
                <li><Link to="/all-turfs">All Turfs</Link></li> {/* Changed from All Grounds */}
            </ul>
        </nav>
    );
};

export default NavBar;
