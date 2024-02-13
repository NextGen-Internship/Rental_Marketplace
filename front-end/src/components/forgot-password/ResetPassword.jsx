import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { email, token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "password":
        if (value.length < 8) {
          errorMessage = "Password must be at least 8 characters long";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          errorMessage = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    setErrorMessages({
      ...errorMessages,
      [fieldName]: errorMessage,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessages({
        ...errorMessages,
        confirmPassword: "Passwords do not match",
      });
    } else {
      setErrorMessages({
        password: "",
        confirmPassword: "",
      });
      // Continue with form submission or other actions



      navigate("/login");
    }
  };

  return (
    <div className="container d-flex flex-column">
      <div className="row align-items-center justify-content-center min-vh-100">
        <div className="col-12 col-md-8 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="mb-4">
                <h5>Reset Password</h5>
                <p className="mb-2">Please enter a new password:</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errorMessages.password && (
                    <p className="text-danger">{errorMessages.password}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  {errorMessages.confirmPassword && (
                    <p className="text-danger">
                      {errorMessages.confirmPassword}
                    </p>
                  )}
                </div>
                <div className="mb-3 d-grid">
                  <button type="submit" className="btn btn-primary">
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
