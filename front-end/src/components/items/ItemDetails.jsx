import React, { useState, useEffect } from 'react';
import { fetchData } from '../fetchData';
import { useParams, useNavigate } from 'react-router-dom';

const endpoint = 'items/';

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const result = await fetchData(endpoint + id);
        console.log(result);

        setItem(result);
      } catch (error) {
        navigate("/notfound");
      }
    };

    if (!item) {
      fetchItem();
    }
  }, [item, id, navigate]);

  return (
    <div>ItemDetails</div>
  );
};

export default ItemDetails;
