import React, { useState } from "react";
import './Contact.css'; // Import your custom CSS for styling
import { Footer } from '../../Home'; // Adjust the path as necessary
import '../../index.css';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    contactReason: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    contactReason: "",
  });

  // Validation function
  const validateForm = () => {
    let formErrors = { ...errors };
    let isValid = true;

    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
      isValid = false;
    } else {
      formErrors.name = "";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      formErrors.email = "Enter a valid email address";
      isValid = false;
    } else {
      formErrors.email = "";
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!formData.mobile.trim()) {
      formErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!mobilePattern.test(formData.mobile)) {
      formErrors.mobile = "Enter a valid 10-digit mobile number";
      isValid = false;
    } else {
      formErrors.mobile = "";
    }

    if (!formData.contactReason.trim()) {
      formErrors.contactReason = "Please provide a reason for contacting us";
      isValid = false;
    } else {
      formErrors.contactReason = "";
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Show success toast
      toast.success("Form submitted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });

      // Reset form data after successful submission
      setFormData({
        name: "",
        email: "",
        mobile: "",
        contactReason: "",
      });
    } else {
      // Show error toast if validation fails
      toast.error("Please correct the errors in the form", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="contact">
      <header className="contact-header">
        <h1>Contact Us</h1>
      </header>
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="formName">Name</label>
            <input
              type="text"
              id="formName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="formEmail">Email address</label>
            <input
              type="email"
              id="formEmail"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="formMobile">Mobile Number</label>
            <input
              type="tel"
              id="formMobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter mobile number"
              required
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="formContactReason">Why are you contacting us?</label>
            <textarea
              id="formContactReason"
              name="contactReason"
              rows={3}
              value={formData.contactReason}
              onChange={handleInputChange}
              placeholder="Enter your message"
              required
            />
            {errors.contactReason && <span className="error">{errors.contactReason}</span>}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      <Footer />
      
      {/* ToastContainer is the container for all toast messages */}
      <ToastContainer />
    </div>
  );
}
