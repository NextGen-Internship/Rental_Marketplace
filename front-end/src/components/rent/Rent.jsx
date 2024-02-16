import React, { useState } from "react";
import Calendar from "@demark-pro/react-booking-calendar";

const Rent = () => {
  const reserved = [
    {
      startDate: new Date(2023, 3, 22),
      endDate: new Date(2016, 4, 5),
    },
  ];

  const [selectedDates, setSelectedDates] = useState([]);
  const handleChange = (e) => setSelectedDates(e);

  return (
    <div>
      <button className="rent-button">Rent</button>
      
      <Calendar />
    </div>
  );
};

export default Rent;
