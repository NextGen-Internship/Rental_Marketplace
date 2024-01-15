import axios from "axios";

const apiUrl = "http://localhost:8080/rentify";

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${apiUrl}/${endpoint}`);
    //console.log(response);
    return response.data;
  } catch (error) {
    //console.error('Error fetching data:', error);
    throw error;
  }
};
