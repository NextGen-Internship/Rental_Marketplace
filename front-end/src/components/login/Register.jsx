import axios from "axios";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

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

  const [value, setValue] = useState();

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
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
          
        ).then((response) => {
          console.log("Registration successful:", response.data.token);
          localStorage.setItem("register_token", response.data.token);
        });
        console.log("Registration successful:", response.data);
        
        navigate("/login");
      } catch (error) {
     


        if (error.response && error.response.data) {
          const { data } = error.response;
          console.log("Registration failed:", data);
      
          const errorMessage = data.errorMessage || '';
          
          
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

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1>Sign up</h1>

        <form className="form">
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
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleInputChange}
            />
            <p className="error-message">{errorMessages.password}</p>
          </label>

          <label>
            Confirm Password
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleInputChange}
            />
            <p className="error-message">{errorMessages.confirmPassword}</p>
          </label>


          <div className="register-password-btn">
            <button
              type="button"
              className="toggle-password-button"
              onClick={handleTogglePassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
     
          <PhoneInput defaultCountry="BG" value={value} onChange={setValue} />
        
        </form>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
  }



export default Register;
