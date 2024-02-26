import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAdditionalInfo = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [iban, setIban] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState({
    city: "",
    street: "",
    postCode: "",
    streetNumber: "",
  });
  const [showIbanField, setShowIbanField] = useState(false);
  const [showPhoneNumberField, setShowPhoneNumberField] = useState(false);
  const [showAddressField, setShowAddressField] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== null) {
      const decoded = jwtDecode(token);
      setUserId(decoded.jti);
    } else {
      navigate("/login");
    }

    const fetchUser = async () => {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.jti;


        if (userId) {
          console.log("idiiitooo " + userId);

          const backendUrl = `http://localhost:8080/rentify/users/${userId}`;
          const result = await axios.get(backendUrl);

          console.log(result.data);
          setIban(result.data.iban || "");
          setPhoneNumber(result.data.phoneNumber || "");
          setAddress(result.data.address || "");

          if (!result.data.iban) {
            setShowIbanField(true);
          }

          if (!result.data.phoneNumber) {
            setShowPhoneNumberField(true);
          }

          if (!result.data.address) {
            setShowAddressField(true);
          }
        }
      } catch (error) {}
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {};

      if (phoneNumber) {
        body.phoneNumber = phoneNumber;
      }

      if (iban) {
        body.iban = iban;
      }

      if (address.city) {
        body.city = address.city;
      }

      if (address.postCode) {
        body.postCode = address.postCode;
      }

      if (address.street) {
        body.street = address.street;
      }

      if (address.streetNumber) {
        body.streetNumber = address.streetNumber;
      }

      console.log(body);

      const backendUrl = `http://localhost:8080/rentify/users/add-additional-info/${userId}`;
      const response = await axios.patch(backendUrl, body);

      console.log("rr", response.data);
      setIban("");
      setPhoneNumber("");

      navigate("/items/create");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddressChange = (field, value) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [field]: value,
    }));
  };

  return (
    <div className="container d-flex flex-column">
      <div className="row align-items-center justify-content-center min-vh-100">
        <div className="col-12 col-md-8 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="mb-4">
                <h5>
                  Please provide the following additional information to enable
                  item addition:
                </h5>
              </div>

              <form onSubmit={handleSubmit}>
                {showIbanField && (
                  <div className="mb-3">
                    <label htmlFor="iban" className="form-label">
                      IBAN
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="iban"
                      value={iban}
                      onChange={(e) => setIban(e.target.value)}
                    />
                  </div>
                )}
                {showPhoneNumberField && (
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                )}
                {showAddressField && (
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) =>
                        handleAddressChange("city", e.target.value)
                      }
                    />
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Post code"
                      value={address.postCode}
                      onChange={(e) =>
                        handleAddressChange("postCode", e.target.value)
                      }
                    />
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Street"
                      value={address.street}
                      onChange={(e) =>
                        handleAddressChange("street", e.target.value)
                      }
                    />
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Street number"
                      value={address.streetNumber}
                      onChange={(e) =>
                        handleAddressChange("streetNumber", e.target.value)
                      }
                    />
                  </div>
                )}
                <div className="mb-3 d-grid">
                  <button type="submit" className="btn btn-primary">
                    Confirm
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

export default AddAdditionalInfo;
