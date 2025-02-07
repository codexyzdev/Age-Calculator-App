import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { calculateAge, isValidDate } from "../utils/calculator";
import ResultAnimation from "./Result-animation";
import "../styles/Age-calculator.css";
import toast, { Toaster } from "react-hot-toast";

export default function AgeCalculator() {
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [actual, setActual] = useState(new Date().getFullYear());
  // Resultados en variables
  const [yearsResult, setYearsResult] = useState("");
  const [monthsResult, setMonthsResult] = useState("");
  const [daysResult, setDaysResult] = useState("");

  const handleChange = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (date.day) {
      dayRef.current.required = false;
    } else {
      dayRef.current.required = true;
    }
    if (date.month) {
      monthRef.current.required = false;
    } else {
      monthRef.current.required = true;
    }
    if (date.year) {
      yearRef.current.required = false;
    } else {
      yearRef.current.required = true;
    }

    if (
      isValidDate(parseInt(date.day), parseInt(date.month), parseInt(date.year))
    ) {
      console.log("fecha valida");
      const { years, months, days } = calculateAge(
        parseInt(date.day),
        parseInt(date.month),
        parseInt(date.year)
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
        className='max-w-80 md:max-w-max bg-white px-6 py-10 rounded-lg rounded-br-[5rem] md:p-12 transition-all duration-300 mx-auto  md:mx-0'
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
              max={actual}
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
          <motion.p
            className='text-[40px] leading-11 md:text-6xl md:leading-18'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {yearsResult ? (
              ResultAnimation(yearsResult, 0)
            ) : (
              <span className='text-purple mr-2'>--</span>
            )}
            years
          </motion.p>
          <motion.p
            className='text-[40px] leading-11 md:text-6xl md:leading-18'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {monthsResult ? (
              ResultAnimation(monthsResult, 0.2)
            ) : (
              <span className='text-purple mr-2'>--</span>
            )}
            months
          </motion.p>
          <motion.p
            className='text-[40px] leading-11 md:text-6xl md:leading-18'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {daysResult ? (
              ResultAnimation(daysResult, 0.4)
            ) : (
              <span className='text-purple mr-2'>--</span>
            )}
            days
          </motion.p>
        </div>
      </form>
    </div>
  );
}
