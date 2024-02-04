import React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import axios  from 'axios';
import { Link, useParams } from "react-router-dom";
import noImage from "../../assets/no-image.avif";







import { jwtDecode } from 'jwt-decode';
const ProfilePage = () => {
  const [userItems, setuserItems] = useState([]);

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ','
});


  useEffect(() => {

    const token = localStorage.getItem('token');

    const decoded = jwtDecode(token);
    const userId = decoded.jti;

    
    console.log(userId);
      const fetchUserItems = async () => {


          try {
              const response = await axios.get(`http://localhost:8080/rentify/items/user/published/${userId}`);
               console.log('API Response:', response);
              
              setuserItems(response.data);

              console.log('Updated userItems:', response.data);
          } catch (error) {
              console.error('Error fetching user items:', error);
          }
      };

      const fetchUserInfo = async () => {


        try{ 
        const response = await axios.get(`http://localhost:8080/rentify/users/${userId}`);
        setUserInfo(response.data);
        console.log("infoooo")
        console.log(response.data);
        }
        catch(error){
          console.error("Error fetching user Info ", error);
        }
     

      };


      
      fetchUserItems();
      fetchUserInfo();
  }, []);




  console.log('Render userItems:', userItems);
  return (
<div className="container">
    <div className="main-body">
  
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>{userInfo.firstName} {userInfo.lastName} </h4>
                      <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">Message</button>
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
                      {userInfo.firstName} {userInfo.lastName}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.email}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.phoneNumber}
                    </div>
                  </div>
                  
                  
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      //Ako e null da e prazno 
                      <br></br>
                      Bay Area, San Francisco, CA
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info " target="__blank" >Edit</a>
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
