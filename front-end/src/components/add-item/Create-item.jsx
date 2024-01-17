import React, { useState } from "react";
import "./Create-item.css";
import CategoryModal from "./CategoryModal";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function CreateItem() {
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pictures, setPictures] = useState(Array(8).fill(null));
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [address, setAddress] = useState({
    city: "",
    street: "",
    postCode: "",
    streetNumber: "",
  });

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setTitle(inputValue);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handlePictureClick = (index) => {
    const fileInput = document.getElementById(`fileInput${index}`);
    fileInput && fileInput.click();
  };

  const handleRemovePicture = (index) => {
    const updatedPictures = [...pictures];
    updatedPictures[index] = null;
    setPictures(updatedPictures);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    const updatedPictures = [...pictures];
    updatedPictures[index] = file;
    setPictures(updatedPictures);
  };

  const handleDescriptionChange = (event) => {
    const descriptionValue = event.target.value;

    if (descriptionValue.length <= 500) {
      setDescription(descriptionValue);
    }
  };

  const handleSelectPrice = (event) => {
    const inputValue = event.target.value;
    setPrice(inputValue);
  };

  const handleSelectDeposit = (event) => {
    const inputValue = event.target.value;
    setDeposit(inputValue);
  };

  const handleAddressChange = (field, value) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [field]: value,
    }));
  };

  const handleAddItem = async () => {
    try {

      const backendUrl = "http://localhost:8080/rentify/create";
      const requestData = {
        title,
        description,
        price,
        deposit,
        pictures,
        category: selectedCategory,
        address,
      };

      const response = await axios.post(backendUrl, requestData, {});
      console.log(response.data);
      if (response.status === 200) {
        console.log("Item added successfully:", response.data);
      } else {
        console.error("Error adding item. Status:", response.status);
      }
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  };

  return (
    <div className="createItem-container">
      <h1>Add Item</h1>
      <section className="info">
        <h2>What you offer?</h2>
        <h3>Title*</h3>
        <input
          className="title-field"
          type="text"
          placeholder="Example: Iphone 13 with warranty"
          value={title}
          onChange={handleChange}
          maxLength={70}
        />
        <p className="character-count">{title.length}/70</p>

        <div className="modal-button">
          <CategoryModal onSelectCategory={handleSelectCategory} />
        </div>

        <div className="selected-category">
          {selectedCategory && <p> {selectedCategory}</p>}
        </div>
      </section>

      <section className="cost">
        <h3>Price&Deposit*</h3>
        <div className="fields-container">
          <input
            className="price-field"
            type="text"
            placeholder="Item Price BGN"
            value={price}
            onChange={handleSelectPrice}
          />
          <input
            className="price-field"
            type="text"
            placeholder="Item Deposit BGN"
            value={deposit}
            onChange={handleSelectDeposit}
          />
        </div>
      </section>

      <section className="pictures">
        <h3>Pictures*</h3>
        <div className="picture-grid">
          {pictures.map((picture, index) => (
            <div key={index}>
              <button
                className="remove-picture-btn"
                onClick={() => handleRemovePicture(index)}
              >
                <DeleteForeverIcon></DeleteForeverIcon>
              </button>
              <div
                key={index}
                className="picture-box"
                onClick={() => handlePictureClick(index)}
              >
                <input
                  type="file"
                  id={`fileInput${index}`}
                  style={{ display: "none" }}
                  onChange={(event) => handleFileChange(index, event)}
                />
                {picture ? (
                  <img
                    src={URL.createObjectURL(picture)}
                    alt={`Picture ${index + 1}`}
                    className="picture-image"
                  />
                ) : (
                  <p>Click to add picture</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="description">
        <h3>Description*</h3>
        <textarea
          className="description-field"
          cols="133"
          rows="14"
          placeholder="Provide a description for your item..."
          value={description}
          onChange={handleDescriptionChange}
        >
          maxLength={500}
        </textarea>
        <p className="character-count">{description.length}/500</p>
      </section>

      <section className="location">
        <h3>Location*</h3>
        <div className="fields-container">
          <input
            className="location-field"
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => handleAddressChange("city", e.target.value)}
          />
          <input
            className="location-field"
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) => handleAddressChange("street", e.target.value)}
          />
          <input
            className="location-field"
            type="text"
            placeholder="Post-Code"
            value={address.postCode}
            onChange={(e) => handleAddressChange("postCode", e.target.value)}
          />
          <input
            className="location-field"
            type="text"
            placeholder="Street-Number"
            value={address.streetNumber}
            onChange={(e) =>
              handleAddressChange("streetNumber", e.target.value)
            }
          />
        </div>
      </section>

      <button className="add-btn" onClick={handleAddItem}>
        Add Item
      </button>
    </div>
  );
}

export default CreateItem;
