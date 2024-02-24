import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import noImage from "../../assets/no-image.avif";
import { useNavigate } from "react-router-dom";


const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  const [recentItems, setRecentItems] = useState([]);

  const [userDetails, setUserDetails] = useState({});

  const [blockedUsers, setBlockedUsers] = useState([]);


  const role = null;

  const [showAllReviews, setShowAllReviews] = useState(false);


  const navigate = useNavigate();


  const token = localStorage.getItem("token");

  const decoded = jwtDecode(token);
  const userId = decoded.jti;


  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const response = await axios.get(
          `http://localhost:8080/rentify/users/admin/${userId}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    }


    const fetchUserInfo = async () => {
      try{

        const response = await axios.get(
          `http://localhost:8080/rentify/users/${userId}`
        );

        setUserDetails(response.data);
      }catch(error) {

      }
    }


    const fetchLastAddedItems = async () => {

      try {


        const response = await axios.get(
          `http://localhost:8080/rentify/items/recentItems`
        );


        setRecentItems(response.data);

      } catch (error) {
        console.error("Error fetching itmes " + error)
      }
    }

    const fetchBlockedUsers = async () => {

      try {

        const response = await axios.get(
          `http://localhost:8080/rentify/users/blocked`
        );

    
        setBlockedUsers(response.data);

      } catch (error) {
        console.error("Error fetching blockedUsers " + error);
      }
    }



    if (userDetails?.role?.role === "USER") {
      navigate("/*");
  } 

    fetchUsers();
    fetchLastAddedItems();
    fetchBlockedUsers();
    fetchUserInfo();
   
  }, [userDetails]);

  const updateRole = async (userId) => {
    try {

      const response = await axios.put(
        `http://localhost:8080/rentify/users/admin/updateRole/${userId}`
      );

    } catch (error) {
      console.error("Error updating role " + error)
    }
  };


  const updateBlockUser = async (userId) => {
    try {

      const response = await axios.put(
        `http://localhost:8080/rentify/users/admin/blockUser/${userId}`
      );

    } catch (error) {
      console.error("Error updating role " + error)
    }
  };

  const updateActivity = async (itemId) => {
    try {

      const response = await axios.put(
        `http://localhost:8080/rentify/items/status/${itemId}`
      );


    } catch (error) {
      console.error("Error updating role " + error)
    }
  }
  const displayedItems = showAllReviews ? recentItems : recentItems.slice(0, 3);
  const displayUsers = showAllReviews ? users : users.slice(0, 2);

  const displayBlocked = showAllReviews ? blockedUsers : blockedUsers.slice(0, 2);


  return (
    <div class="row flex-grow">
      <div class="col-12 grid-margin stretch-card">
        <div class="card card-rounded">
          <div class="card-body">
            <div class="d-sm-flex justify-content-between align-items-start">

            </div>
            <div class="table-responsive mt-1">
              <table class="table select-table">
                <thead>
                  <tr>
                    <th>
                    </th>
                    <th> <h5>Users </h5></th>
                    <th> <h5>Role </h5></th>
                  </tr>
                </thead>
                <tbody>
                { displayUsers.length > 0 ? ( 
                  <> 
                  {displayUsers.map(user => (
                    <tr key={user.id}>
                      <td>

                        <div class="d-flex">
                          <img src={user.profilePicture} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '10px' }} />
                        </div>

                      </td>
                      <td>
                        <div class="d-flex">
                          <div>
                            <h4 style={{ paddingTop: '30px' }} >{user.firstName} {user.lastName}</h4>
                            <p style={{ paddingTop: '10px' }}>{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h6 style={{ paddingTop: '50px' }}>{user.role.role}</h6>
                      </td>
                      <td>
                        <div class="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap" style={{ marginTop: '30px' }}>
                          <button onClick={() => updateRole(user.id)}
                            class={`btn btn-lg text-white mb-0 me-0 ${user.role.role === 'USER' ? 'btn-primary' : 'btn-danger'}`}
                            type="button"
                          >
                            <i class="mdi mdi-account-plus"></i>
                            {user.role.role === 'USER' ? 'Make it Admin' : 'Make it User'}
                          </button>
                        </div>

                      </td>
                      <td>
                        <div class="badge badge-opacity-warning" style={{ marginTop: '30px' }}>
                          <button onClick={() => updateBlockUser(user.id)}
                            class={`btn btn-lg text-white mb-0 me-0 ${user.blocked ? 'btn-primary' : 'btn-danger'}`}
                            type="button"

                          >
                            <i class="mdi mdi-account-plus"></i>
                            {user.blocked ?
                              'Unblock User' : 'Block User'}
                          </button>
                        </div>

                      </td>
                    </tr>
                  ))}
                   {users.length > 2 && (
                <div className="list align-items-center pt-3">
                <div className="wrapper w-100">
                  <p className="mb-0">
                    <a href="#" className="fw-bold text-primary" onClick={() => setShowAllReviews(!showAllReviews)}>
                      {showAllReviews ? 'Show Less' : 'Show More'} <i className="mdi mdi-arrow-right ms-2"></i>
                    </a>
                  </p>
                </div>
              </div>


            )} 
              </> 
            ):( 
                <h4>Dont have Users</h4>
            )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


    
      <div class="row flex-grow">
        <div class="col-md-6 col-lg-6 grid-margin stretch-card">
          <div class="card card-rounded">
            <div class="card-body card-rounded">
              <h4 class="card-title  card-title-dash">Last Recent Items</h4>
              { displayedItems.length > 0 ? ( 
                <>
              {displayedItems.map((item, index) => (
                <div key={index}  style={{
                  backgroundColor: !item.isActive ?  "#C0C0C0" : "inherit",
                }} className="list align-items-center border-bottom py-2">
                  <div className="wrapper w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.thumbnail || noImage}
                          className="img-sm rounded-10 me-3"

                          style={{
                            width: '140px',
                            height: '100px',
                          }}
                        />
                        <div style={{ marginLeft: '100px' }}>
                          <div>
                          <a href={`/items/${item.id}`} style={{ color: 'orange', textDecoration: 'none' }}>

                            <h5 className="mb-0 font-weight-medium">{item.name}</h5>

                            <p className="mb-0 text-small text-muted">  {item.postedDate[2]}/{item.postedDate[1]}/{item.postedDate[0]}</p>
                            <p className="mb-0 text-small text-muted">  {item.postedDate[3]}:{item.postedDate[4]}</p>
                          </a>
                        </div>
               
                      </div>
                    </div>
                    <div style={{ marginRight: '1px' }}>                          
                          <button onClick={() => updateActivity(item.id)}
                           class={`btn btn-lg text-white mb-0 me-0 ${item.isActive === true ? 'btn-warning' : 'btn-primary'}`}
                           type="button"
                         >
                           <i class="mdi mdi-account-plus"></i>
                           {item.isActive === true ? 'Deactivate' : 'Activate'}
                         </button>
                         </div> 
                    
                  </div>
                </div>
                </div>

              ))}
               {recentItems.length > 2 && (
                <div className="list align-items-center pt-3">
                <div className="wrapper w-100">
                  <p className="mb-0">
                    <a href="#" className="fw-bold text-primary" onClick={() => setShowAllReviews(!showAllReviews)}>
                      {showAllReviews ? 'Show Less' : 'Show More'} <i className="mdi mdi-arrow-right ms-2"></i>
                    </a>
                  </p>
                </div>
              </div>


            )} 
             </> 
            ):( 

                
                <h4>Dont have reviews yet.</h4>
            )}

          
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-6 grid-margin stretch-card">
        <div class="card card-rounded">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 class="card-title card-title-dash">Blocked Users</h4>
              </div>
            </div>
            { displayBlocked.length > 0 ? (  
              <> 
            {displayBlocked.map((blockedUser, index) => (
              <div key={index} class="mt-3">
                <div class="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                  <div class="d-flex">
                    <img class="img-sm rounded-10" src={blockedUser.profilePicture} style={{ width: '100px', height: '100px', borderRadius: '50%', marginTop: '10px' }} alt="profile" />
                    <div class="wrapper ms-3">
                      <p class="ms-1 mb-1 fw-bold">{blockedUser.firstName} {blockedUser.lastName}</p>
                      <small class="text-muted mb-0">{blockedUser.email}</small>
                    </div>
                  </div>
                  <div class="text-muted text-small">
                    <button onClick={() => updateBlockUser(blockedUser.id)}
                      class={`btn btn-lg text-white mb-0 me-0 ${blockedUser.blocked ? 'btn-primary' : 'btn-danger'}`}
                      type="button"

                    >
                      <i class="mdi mdi-account-plus"></i>
                      {blockedUser.blocked ?
                        'Unblock User' : 'Block User'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
              {blockedUsers.length > 2 && (
                <div className="list align-items-center pt-3">
                <div className="wrapper w-100">
                  <p className="mb-0">
                    <a href="#" className="fw-bold text-primary" onClick={() => setShowAllReviews(!showAllReviews)}>
                      {showAllReviews ? 'Show Less' : 'Show More'} <i className="mdi mdi-arrow-right ms-2"></i>
                    </a>
                  </p>
                </div>
              </div>


            )} 
               </> 
            ):( 

                
                <h4>Dont have Blocked Users.</h4>
            )}

          </div>
        </div>
      </div>
    </div>
    </div >

  );
};
export default AdminPanel;