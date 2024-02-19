import React, { useState } from 'react';
import './MyCalendar.css';

const MyCalendar = () => {
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [currentDate, setCurrentDate] = useState(new Date());
  const disabledDates = getDisabledDates();

  function getDisabledDates() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const disabledDates = [];

    for (let i = 1; i < currentDay; i++) {
      const date = new Date(currentYear, currentMonth, i);
      disabledDates.push(date.toISOString().split('T')[0]);
    }

    return disabledDates;
  }

  const handleDateClick = (dateString) => {
    if (!selectedRange.start) {
      // If start date is not set, set it
      setSelectedRange({ start: dateString, end: null });
    } else if (!selectedRange.end) {
      // If end date is not set, set it
      setSelectedRange({ ...selectedRange, end: dateString });
    } else {
      // If both start and end dates are set, reset selection
      setSelectedRange({ start: dateString, end: null });
    }
  };

  const isDateDisabled = (date) => {
    return disabledDates.includes(date);
  };

  const isSelectedDate = (date) => {
    return (
      selectedRange.start === date ||
      selectedRange.end === date ||
      (selectedRange.start && selectedRange.end &&
        new Date(date) > new Date(selectedRange.start) &&
        new Date(date) < new Date(selectedRange.end))
    );
  };

  const renderCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const monthDays = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dateString = date.toISOString().split('T')[0];
      monthDays.push(
        <div
          key={dateString}
          className={`calendar-day ${isSelectedDate(dateString) ? 'selected' : ''} ${isDateDisabled(dateString) ? 'disabled' : ''}`}
          onClick={() => !isDateDisabled(dateString) && handleDateClick(dateString)}
        >
          {i}
        </div>
      );
    }

    const emptyDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      emptyDays.push(<div key={`empty${i}`} className="empty-day"></div>);
    }

    return [...emptyDays, ...monthDays];
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handlePaymentRedirect = () => {
    // Redirect to payment page with selectedRange data
    console.log('Redirecting to payment page with selectedRange:', selectedRange);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">{renderCalendar()}</div>

      {selectedRange.start && selectedRange.end && (
        <button onClick={handlePaymentRedirect}>Proceed to Payment</button>
      )}
    </div>
  );
};

export default MyCalendar;
