import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import { useState } from "react";
import { FreeBreakfast } from "@mui/icons-material";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
  });

  const [loading, setLoading] = useState(false);

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

  const handleSubmit =  async(e) => {

    console.log("bachka butona")
    e.preventDefault();
    setErrorMessages({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",

    });

    let isValid = true;


    if (isValid) {
      
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:8080/rentify/register",
          formValues
        );
        console.log("Registration successful:", response.data);
        navigate("/login");
      } catch (error) {
     


        if (error.response && error.response.data) {
          const { data } = error.response;
          console.log("Registration failed:", data);
      
          const errorMessage = data.errorMessage || '';
          
          // Extract field name from error message
          const fieldNameMatch = errorMessage.match(/User with (\w+) .+ already exists/);
          const fieldName = fieldNameMatch ? fieldNameMatch[1].toLowerCase() : '';
      
          if (fieldName === "email") {
            setErrorMessages((prevErrors) => ({
              ...prevErrors,
              email: errorMessage,
            }));
          } else if (fieldName === "phonenumber") {
            setErrorMessages((prevErrors) => ({
              ...prevErrors,
              phoneNumber: errorMessage,
            }));
          } else {
            // Default case when field name is not recognized
            setErrorMessages((prevErrors) => ({
              ...prevErrors,
              email: errorMessage,
            }));
          }
        }













      } finally {
        setLoading(false);
      }


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
          <button type="submit" >Submit</button>
        </form>
      </div>
    </div>
  );
  }



export default Register;
