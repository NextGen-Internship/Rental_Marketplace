import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const token = localStorage.getItem("token");

        const decoded = jwtDecode(token);
        const userId = decoded.jti;
        const userEmail = decoded.email;
        setUserDetails(decoded)
        //localhost:8080/rentify/users/admin/4
        const response = await axios.get(
          `http://localhost:8080/rentify/users/admin/${userId}`
        );

        console.log("responsaaaa na admina")
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    }
    fetchUsers();
  }, []);


  const updateRole = async (userId) => {
    try{

      const response = await axios.put(
        `http://localhost:8080/rentify/users/admin/updateRole/${userId}`
      );

    }catch(error)
    {
      console.error("Error updating role " + error)
    }
  };

  console.log(userDetails.email)
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
                  {users.map(user => (
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
                          <button   onClick={() => updateRole(user.id)}
                            class={`btn btn-lg text-white mb-0 me-0 ${user.role.role === 'USER' ?   'btn-primary' : 'btn-danger'}`}
                            type="button"
                          >
                            <i class="mdi mdi-account-plus"></i>
                            {user.role.role === 'USER' ? 'Make it Admin' : 'Make it User'}
                          </button>
                        </div>

                      </td>
                      <td>
                        <div class="badge badge-opacity-warning" style={{ marginTop: '30px' }}>
                          <button class="btn btn-danger btn-lg text-white mb-0 me-0" type="button"><i class="mdi mdi-account-plus"></i>Block user</button>
                        </div>

                      </td>
                    </tr>
                  ))}
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
              <h4 class="card-title  card-title-dash">pOSLEDNI KACHENI OBQVI</h4>
              <div class="list align-items-center border-bottom py-2">
                <div class="wrapper w-100">
                  <p class="mb-2 font-weight-medium">
                    Change in Directors
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <i class="mdi mdi-calendar text-muted me-1"></i>
                      <p class="mb-0 text-small text-muted">Mar 14, 2019</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list align-items-center border-bottom py-2">
                <div class="wrapper w-100">
                  <p class="mb-2 font-weight-medium">
                    Other Events
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <i class="mdi mdi-calendar text-muted me-1"></i>
                      <p class="mb-0 text-small text-muted">Mar 14, 2019</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list align-items-center border-bottom py-2">
                <div class="wrapper w-100">
                  <p class="mb-2 font-weight-medium">
                    Quarterly Report
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <i class="mdi mdi-calendar text-muted me-1"></i>
                      <p class="mb-0 text-small text-muted">Mar 14, 2019</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list align-items-center border-bottom py-2">
                <div class="wrapper w-100">
                  <p class="mb-2 font-weight-medium">
                    Change in Directors
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                      <i class="mdi mdi-calendar text-muted me-1"></i>
                      <p class="mb-0 text-small text-muted">Mar 14, 2019</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list align-items-center pt-3">
                <div class="wrapper w-100">
                  <p class="mb-0">
                    <a href="#" class="fw-bold text-primary">Show all <i
                      class="mdi mdi-arrow-right ms-2"></i></a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;