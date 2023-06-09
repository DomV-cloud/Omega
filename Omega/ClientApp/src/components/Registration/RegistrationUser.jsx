﻿import React, { useState } from "react";
import axios from "axios";
import PasswordStrengthBar from 'react-password-strength-bar';
import { useNavigate } from 'react-router-dom';
import SuccessfulPopUp from "../Login/SuccessfulPopUp";
import FailedRegistration from "../Login/FailedRegistration";
/**
 * React component that creates registration form for user registration. 
 * Components is handling errors and display them to user.
 * @returns {JSX.RegistrationUser} form for user registration component
 */
const RegistrationUser = () => {


    // State for form fields
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [Email, setEmail] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [Password, setPassword] = useState("");

    //State for Sucessful registration
    const [isOkay, setIsOkay] = useState(false);

    //States for failed registration
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // State for form errors
    const [firstNameError, setfirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneNumberError, setphoneNumberError] = useState("");
    const [passwordError, setpasswordError] = useState("");

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                fname: Fname.trim(),
                lname: Lname.trim(),
                email: Email.trim(),
                phone_number: PhoneNumber.trim(),
                password: Password.trim(),
            };

            const response = await axios.post("/api/user/registration", formData);
            console.log(response.data); // Process server response

            // Clear form fields
            setFname("");
            setLname("");
            setEmail("");
            setPhoneNumber("");
            setPassword("");
            setIsOkay(true);
            setTimeout(() => {
               window.location.href = ("/api/user");
            }, 3000); // redirect after 3 seconds
        } catch (error) {
            console.log(error); // error handling
            setShowErrorModal(true);
            setErrorMessage(error.message);

        }
    };


    // Functions to handle form field changes
    const handleFirstNameChange = (e) => {
        const value = e.target.value.trim();
        if (value.length <= 50) {
            setFname(value);
            setfirstNameError("");
        } else {
            setfirstNameError("First name cannot exceed 50 characters.");
        }
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value.trim();
        if (value.length <= 50) {
            setLname(value);
            setLastNameError("");
        } else {
            setLastNameError("Last name cannot exceed 50 characters.");
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value.trim();
        if (value.length <= 100) {
            setEmail(value);
            setEmailError("");
        } else {
            setEmailError("Email cannot exceed 100 characters.");
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 50) {
            setPhoneNumber(value);
            setphoneNumberError("");
        } else {
            setphoneNumberError("Phone number cannot exceed 50 digits.");
        }
    };

    const handlePasswordChange = (e) => {
        const userPassword = e.target.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]{8,}$/;
        const isPasswordValid = passwordRegex.test(userPassword);

        if (!isPasswordValid) {
            setPassword(userPassword);
            setpasswordError("");
        } else {
            setpasswordError("Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and must be at least 8 characters long.")

        }

    };


   

    // Render form

    return (

        <>
    <div className="w-full max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"

      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Fname"
            name="Fname"
            type="text"
                      placeholder="Enter your first event_name"
                      onChange={handleFirstNameChange}
            value={Fname}
            required
                  />
                  {firstNameError && (
                      <p className="text-red-500 text-xs italic">{firstNameError}</p>
                  )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Lname"
            name="Lname"
            type="text"
            placeholder="Enter your last event_name"
                      value={Lname}
                      onChange={handleLastNameChange}
                      required

                  />
                  {lastNameError && (
                      <p className="text-red-500 text-xs italic">{lastNameError}</p>
                  )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Email"
            name="Email"
            type="Email"
                      placeholder="Enter your email"
                      onChange={handleEmailChange}
            value={Email}
            required
                  />
                  {emailError && (
                      <p className="text-red-500 text-xs italic">{emailError}</p>
                  )}
                
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Phone_number"
                      name="Phone_number"
            type="tel"
                      placeholder="Enter your phone number"
                      onChange={handlePhoneChange}
                      value={PhoneNumber}
            required
                  />
                  {phoneNumberError && (
                      <p className="text-red-500 text-xs italic">{phoneNumberError}</p>
                  )}
              </div>
              <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                      Password
                  </label>
                  <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="Password"
                      name="Password"
                      type="password"
                      placeholder="Enter your password"
                      onChange={handlePasswordChange}
                      value={Password}
                      required
                      
                  />
                  {passwordError && (
                      <p className="text-red-500 text-xs italic">{passwordError}</p>
                  )}
                  <PasswordStrengthBar password={Password} />
              </div>
        <div className="flex items-center justify-center">
                 
                  <button
                      
                          className="bg-primary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="submit"
                      >
                          Register
                      </button>
               
                  
        </div>
      </form>
    </div>

            {isOkay &&
                <SuccessfulPopUp />    
            }

            {showErrorModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                       

                        <FailedRegistration message={errorMessage} onClose={() => setShowErrorModal(false)} />
                    </div>
                </div>
            )}



        </>

  );
};

export default RegistrationUser;
