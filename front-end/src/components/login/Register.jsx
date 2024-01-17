import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import { useState } from "react";
import { FreeBreakfast } from "@mui/icons-material";
import { json } from "react-router-dom";

function Register() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: {
      city: "",
      postCode: "",
      street: "",
      streetNumber: "",
    },
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: {
      city: "",
      postCode: "",
      street: "",
      streetNumber: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormValues((prevValues) => ({
        ...prevValues,
        address: {
          ...prevValues.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessages({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      city: "",
      postCode: "",
      street: "",
      streetNumber: "",
    });

    let isValid = true;
    for (const key in formValues) {
      if (typeof formValues[key] === "object") {
        for (const addressKey in formValues[key]) {
          if (formValues[key][addressKey] === "") {
            setErrorMessages((prevErrors) => ({
              ...prevErrors,
              [key]: {
                ...prevErrors[key],
                [addressKey]: "This field is required",
              },
            }));
            isValid = false;
          }
        }
      } else if (formValues[key] === "") {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [key]: "This field is required",
        }));
        isValid = false;
      }
    }

    if (isValid) {
      axios.post("http://localhost:8080/rentify/register", formValues)
      .then(response => {
        console.log('Registration successful:', response.data);
      })
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1>Sign up</h1>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            First name
            <input type="text" name="firstName" onChange={handleInputChange} />
            <p className="error-message">{errorMessages.firstName}</p>
          </label>

          <label>
            Last name
            <input type="text" name="lastName" onChange={handleInputChange} />
            <p className="error-message">{errorMessages.lastName}</p>
          </label>

          <label>
            Email
            <input type="text" name="email" onChange={handleInputChange} />
            <p className="error-message">{errorMessages.email}</p>
          </label>

          <label>
            Password
            <input type="text" name="password" onChange={handleInputChange} />
            <p className="error-message">{errorMessages.password}</p>
          </label>

          <label>
            Confirm Password
            <input
              type="text"
              name="confirmPassword"
              onChange={handleInputChange}
            />
            <p className="error-message">{errorMessages.confirmPassword}</p>
          </label>

          <label>
            Phone Number
            <input
              type="text"
              name="phoneNumber"
              onChange={handleInputChange}
            />
            <p className="error-message">{errorMessages.phoneNumber}</p>
          </label>

          <p>
            <b>Address</b>
          </p>
          <br />

          <label>
            City
            <input type="text" name="city" onChange={handleInputChange} />
            <p className="error-message">{errorMessages.address.city}</p>
          </label>

          <label>
            Post Code
            <input type="text" name="postCode" onChange={handleInputChange} />
            <p className="error-message">{errorMessages.address.postCode}</p>
          </label>

          <label>
            Street
            <input type="text" name="street" onChange={handleInputChange} />
            <p className="error-message">{errorMessages.address.street}</p>
          </label>

          <label>
            Street Number
            <input
              type="text"
              name="streetNumber"
              onChange={handleInputChange}
            />
            <p className="error-message">
              {errorMessages.address.streetNumber}
            </p>
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
