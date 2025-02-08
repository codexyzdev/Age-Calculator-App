import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { calculateAge, isValidDate } from "../utils/calculator";
import Result from "./Result";
import "../styles/Age-calculator.css";

export default function AgeCalculator() {
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  // Resultados en variables
  const [yearsResult, setYearsResult] = useState("");
  const [monthsResult, setMonthsResult] = useState("");
  const [daysResult, setDaysResult] = useState("");

  const handleChange = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { day, month, year } = date;

    dayRef.current.required = !day;
    monthRef.current.required = !month;
    yearRef.current.required = !year;

    const parsedDay = parseInt(day);
    const parsedMonth = parseInt(month);
    const parsedYear = parseInt(year);

    if (isValidDate(parsedDay, parsedMonth, parsedYear)) {
      console.log("fecha valida");
      const { years, months, days } = calculateAge(
        parsedDay,
        parsedMonth,
        parsedYear
      );
      setYearsResult(years);
      setMonthsResult(months);
      setDaysResult(days);
    } else {
      console.log("fecha no valida");
      toast("Invalid date!");
      setYearsResult("");
      setMonthsResult("");
      setDaysResult("");
    }
  };

  return (
    <div>
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className='max-w-80 md:max-w-max bg-white px-6 py-10 rounded-lg rounded-br-[5rem] md:p-12 transition-all duration-300 mx-auto  md:mx-0 shadow-md'
      >
        <div className='grid grid-cols-3 md:grid-cols-4 gap-4 max-w-xl'>
          <label htmlFor='day'>
            Day
            <input
              type='number'
              id='day'
              name='day'
              placeholder='DD'
              min='1'
              max='31'
              onChange={handleChange}
              ref={dayRef}
            />
            <span>this field is required</span>
          </label>

          <label htmlFor='month'>
            Month
            <input
              type='number'
              id='month'
              name='month'
              placeholder='MM'
              min='1'
              max='12'
              ref={monthRef}
              onChange={handleChange}
            />
            <span>this field is required</span>
          </label>
          <label htmlFor='year'>
            Year
            <input
              type='number'
              id='year'
              name='year'
              placeholder='YYYY'
              onChange={handleChange}
              min='1900'
              max={new Date().getFullYear()}
              ref={yearRef}
            />
            <span>this field is required</span>
          </label>
        </div>
        <div className='my-13 relative'>
          <hr className='text-lightgrey' />
          <button className='bg-purple rounded-full p-4 absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 md:right-8 hover:bg-offblack transition-all duration-300'>
            <img
              src='/images/icon-arrow.svg'
              alt='icon arrow'
              className='size-7 md:size-10'
            />
          </button>
        </div>
        <div>
          <Result years='years' result={yearsResult} />
          <Result months='months' result={monthsResult} delay={0.2} />
          <Result days='days' result={daysResult} delay={0.4} />
        </div>
      </form>
    </div>
  );
}
