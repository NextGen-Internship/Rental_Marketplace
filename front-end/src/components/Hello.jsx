import { fetchData } from "./fetchData"
import React, { useEffect, useState } from 'react';

const endpoint = 'hello';

const Hello = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchDataFromApi = async () => {
        try {
          const result = await fetchData(endpoint);
          setData(result);
        } catch (error) {
          // Handle error
        }
      };
  
      fetchDataFromApi();
    }, []);
  
    return (
      <div>
        <h1>{data}</h1>
      </div>
    );
}

export default Hello