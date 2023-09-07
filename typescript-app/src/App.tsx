import React, { useState, useEffect } from 'react';
import './App.css';
import moment from 'moment';

const months: string[] = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

const App: React.FC = () => {
  const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [year, setYear] = useState<number>(selectedDate.getFullYear());
  const [month, setMonth] = useState<number>(selectedDate.getMonth());
  const [monthDay, setMonthDay] = useState<number>(selectedDate.getDate());
  const [inputDate, setInputDate] = useState<string>(selectedDate.toLocaleDateString("en-US"));
  const [calendarHTML, setCalendarHTML] = useState<string>('');
  const [isActive, setActive] = useState<boolean>(false);
  
  const selectedMonth: number = month;
  const selectedYear: number = year;
  const daysInMonth: number = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth: number = new Date(selectedYear, selectedMonth, 1).getDay();

  const handleDateClick = (day: number) => {
    const newSelectedDate: Date = new Date(year, month, day);
    setSelectedDate(newSelectedDate);
    setInputDate(newSelectedDate.toLocaleDateString("en-US"));
  };
  
  const handleMonthChange = (increment: number) => {
	// Change current month by negative or positive 1 depends on button
    const newMonth: number = month + increment;
    if (newMonth < 0) {
	  // Edge case, when we moving from january to december
      setMonth(11);
      setYear(year - 1);
    } else if (newMonth > 11) {
	  // Edge case, when we moving from december to january
      setMonth(0);
      setYear(year + 1);
    } else {
	// All other cases
      setMonth(newMonth);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Set current Date from input field
    setInputDate(e.target.value);
  };

  const handleInputBlur = () => {
    // Check input value for valid values
    const newDate: Date = new Date(inputDate);
    const date = moment(inputDate, 'MM/DD/YYYY'); 
	// Create moment for checking is date valid
    if (date.isValid()) {
      setYear(newDate.getFullYear());
      setMonth(newDate.getMonth());
	  setMonthDay(newDate.getDate());
      setSelectedDate(newDate);
    } else {
      setInputDate('Invalid Date');
    }
  };

  return (
    <div className="App">
      <div className="header">
        <button className='prev-month' onClick={() => handleMonthChange(-1)}>&#8249;</button>
        <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
          {months.map((monthName, index) => (
            <option key={index} value={index}>{monthName}</option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={year - 5 + i}>{year - 5 + i}</option>
          ))}
        </select>
        <button className='next-month' onClick={() => handleMonthChange(1)}>&#8250;</button>
      </div>
      <table>
        <thead>
          <tr>{daysOfWeek.map((day) => <th key={day}>{day}</th>)}</tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, i) => (
            <tr key={i}>
              {Array.from({ length: 7 }, (_, j) => {
                const day: number = i * 7 + j + 1 - firstDayOfMonth;
                return (
                  <td key={day}>
                    {day > 0 && day <= daysInMonth && (
                      <button
                        className='date-cell'
                        onClick={() => handleDateClick(day)}
                      >
                        {day}
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <input
        type="text"
        value={inputDate}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
    </div>
  );
};

export default App;
