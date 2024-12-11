

import React from 'react';
import './AboutUs.css'; 
import { Footer } from '../../Home'; // Adjust the path as necessary
import '../../index.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-text">
        <h1>Welcome to Our Turf Booking System</h1>
        <p>
          Welcome to our Turf Booking System, where convenience meets quality! We are dedicated
          to providing sports enthusiasts with an easy, efficient, and reliable platform to book
          turf facilities for their games and events. Whether you're looking to play football,
          cricket, or any other turf-based sport, our system allows you to quickly reserve the
          perfect spot, anytime, anywhere.
        </p>
      </div>

      <div className="about-us-image">
        {/* Reference the image from the public/images folder */}
        <img src="/images/turf-image.jpg" alt="Turf Booking" />
      </div>

      <Footer /> 
    </div>
  );
};

export default AboutUs;
