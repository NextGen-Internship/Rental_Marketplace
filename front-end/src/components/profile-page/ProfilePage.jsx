import React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import noImage from "../../assets/no-image.avif";
import { jwtDecode } from 'jwt-decode';     

const ProfilePage = () => {
    const [userItems, setuserItems] = useState([]);

    const token = localStorage.getItem("token");


    const decoded = jwtDecode(token);
    const userId = decoded.jti;

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: {
            city: '',
            postCode: '',
            street: '',
            streetNumber: '',
        }
        , profilePicture: ''



    });

    const [imageFile, setimageFile] = useState('');

    const [editedUserInfo, setEditedUserInfo] = useState({ ...userInfo });
    const [editMode, setEditMode] = useState(false);
    const [editPictureMode, setEditPictureMode] = useState(false);

    const handleEditClick = () => {
        setEditedUserInfo({ ...userInfo });
        setEditMode(true);
    };

    const handleEditPicture = () => {
        setEditPictureMode(true);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', imageFile); 
        
            const response = await axios.put(`http://localhost:8080/rentify/updateProfilePicture/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUserInfo(response.data);
            setEditPictureMode(false);
            window.location.reload();

        } catch (error) {
            console.error('Error uploading picture:', error);
        }
    };
    
    const handleFileChange = (event) => {
        setimageFile(event.target.files[0]);
      };



    const handleCancelClickPicture = () => {
        setEditPictureMode(false);

        setEditedUserInfo({ ...userInfo });
    };

    const handleSaveClick = async () => {

     

        const editedAddress = editedUserInfo.address ? {
            city: editedUserInfo.address.city || "",
            postCode: editedUserInfo.address.postCode || "",
            street: editedUserInfo.address.street || "",
            streetNumber: editedUserInfo.address.streetNumber || ""
        } : null; 
        
        const updatedUserInfo = {
            ...editedUserInfo,
            address: editedAddress !== null ? {
                ...userInfo.address,
                ...editedAddress
            } : {} 
        };
        

        try {
            const response = await axios.put(`http://localhost:8080/rentify/update/${userId}`, {
                firstName: updatedUserInfo.firstName || userInfo.firstName,
                lastName: updatedUserInfo.lastName || userInfo.lastName,
                email: updatedUserInfo.email || userInfo.email,
                phoneNumber: updatedUserInfo.phoneNumber || userInfo.phoneNumber,
                addressDto: updatedUserInfo.address,
            });



            setUserInfo(response.data);

            setEditMode(false);
        } catch (error) {
            console.error('Error updating user information:', error);



        };
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setEditedUserInfo((prevInfo) => ({
                ...prevInfo,
                address: {
                    ...prevInfo.address,
                    [addressField]: value,
                },
            }));
        } else {
            setEditedUserInfo((prevInfo) => ({
                ...prevInfo,
                [name]: value,
            }));
        };
    };


    const handleCancelClick = () => {
        setEditMode(false);

        setEditedUserInfo({ ...userInfo });
    };


    useEffect(() => {

        const token = localStorage.getItem('token');


        const decoded = jwtDecode(token);
        const userId = decoded.jti;


        const fetchUserItems = async () => {

            try {
                const response = await axios.get(`http://localhost:8080/rentify/items/user/published/${userId}`);

                setuserItems(response.data);

            } catch (error) {
                console.error('Error fetching user items:', error);
            }
        };

        const fetchUserInfo = async () => {


            try {
                const response = await axios.get(`http://localhost:8080/rentify/users/${userId}`);
                setUserInfo(response.data);

            }
            catch (error) {
                console.error("Error fetching user Info ", error);
            }

        };


        fetchUserItems();
        fetchUserInfo();
    }, []);


    return (
        <div className="container">
            <div className="main-body">

                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">

                                    <img alt="Picture" className="rounded-circle" width="150"


                                        src={userInfo.profilePicture} />

                                    <div className="mt-3">
                                        <h4>{userInfo.firstName} {userInfo.lastName} </h4>
                                        {editPictureMode ? (
                                            <>
                                                <input type="file" accept="image/*" onChange={handleFileChange} />
                                                <button className="btn btn-primary" onClick={handleUpload}>Upload picture</button>
                                                <button className="btn btn-primary" onClick={handleCancelClickPicture}>Cancel picture</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-primary" onClick={handleEditPicture}>Edit picture</button>

                                            </>

                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <ul className="list-group list-group-flush">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {editMode ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            value={editedUserInfo.firstName}
                                                            onChange={handleInputChange}

                                                        />

                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            value={editedUserInfo.lastName}
                                                            onChange={handleInputChange}
                                                        />

                                                    </>

                                                ) : (
                                                    <>
                                                        <span>{userInfo.firstName} </span>
                                                        <span>{userInfo.lastName} </span>
                                                    </>

                                                )}


                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {userInfo.email}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {editMode ? (
                                                    <input
                                                        type="number"
                                                        name="phoneNumber"
                                                        value={editedUserInfo.phoneNumber}
                                                        onChange={handleInputChange}

                                                    />
                                                ) : (
                                                    <span>{userInfo.phoneNumber}</span>
                                                )}
                                            </div>
                                        </div>


                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                {editMode ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            name="address.city"
                                                            placeholder="City"
                                                            value={editedUserInfo.address?.city || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                        <br />
                                                        <br />
                                                        <input
                                                            type="text"
                                                            name="address.postCode"
                                                            placeholder="Post code"
                                                            value={editedUserInfo.address?.postCode || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                        <br />
                                                        <br />

                                                        <input
                                                            type="text"
                                                            name="address.street"
                                                            placeholder="Street"
                                                            value={editedUserInfo.address?.street || ''} onChange={handleInputChange}
                                                        />
                                                        <br />
                                                        <br />
                                                        <input
                                                            type="text"
                                                            name="address.streetNumber"
                                                            placeholder="Street number"
                                                            value={editedUserInfo.address?.streetNumber || ''} onChange={handleInputChange}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>{userInfo.address?.city || ''} </span>
                                                        <span>{userInfo.address?.postCode || ''}  </span>
                                                        <span>{userInfo.address?.street || ''}   </span>
                                                        <span>{userInfo.address?.streetNumber || ''}   </span>
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-12">

                                                {editMode ? (
                                                    <>
                                                        <button className="btn btn-success" onClick={handleSaveClick}>
                                                            Save
                                                        </button>

                                                        <button className="btn btn-danger" onClick={handleCancelClick}>
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button className="btn btn-info" onClick={handleEditClick}>
                                                        Edit
                                                    </button>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">

                                <h5 className="card-title">Published  Items:</h5>
                                <div className="items-list">
                               { userItems.length === 0 ? (

                            <h4>Not published Items yet :(</h4>
                               ): ( 
                                <> 
                                {userItems.map((item) => (
                                    <div className="items-list-item" key={item.id}>
                                        <Link to={`/items/${item.id}`} onClick={() => (item.id)}>
                                            <div className="card">
                                                <img src={item.thumbnail || noImage} className="card-img-top" alt={item.name} />
                                                <div className="card-body">
                                                    <h3 className="card-title">{item.name}</h3>
                                                    <p className="card-text">{"$" + item.price}</p>
                                                    <p className="card-text">{item.address}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}

                                </>
                               ) };

                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default ProfilePage;