import { useState } from "react";
export default function AgeCalculator() {
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [actual, setActual]=useState(new Date().getFullYear())
  // Resultados en variables
  const [yearsResult, setYearsResult] = useState("");
  const [monthsResult, setMonthsResult] = useState("");
  const [daysResult, setDaysResult] = useState("");

  function calculateAge(day, month, year) {
    // Crear la fecha de nacimiento (los meses en JavaScript van de 0 a 11)
    const birthDate = new Date(year, month - 1, day);
    const today = new Date(); // Fecha actual

    // Calcular años
    let years = today.getFullYear() - birthDate.getFullYear();
    // Verificar si el cumpleaños ya ocurrió este año
    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());
    if (!hasBirthdayPassed) years--;

    // Calcular meses
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && !hasBirthdayPassed)) {
      months += 12;
    }
    // Ajustar si el día actual es menor al día de nacimiento
    if (today.getDate() < birthDate.getDate()) {
      months--;
      if (months < 0) {
        months = 11;
        years--; // Ajustar años si los meses se vuelven negativos
      }
    }

    // Calcular días
    let days;

    if (today.getDate() >= birthDate.getDate()) {
      days = today.getDate() - birthDate.getDate();
    } else {
      // Obtener los días del mes anterior
      const lastDayOfPrevMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days = lastDayOfPrevMonth - birthDate.getDate() + today.getDate();
    }
    return { years, months, days };
  }

  const handleChange = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { years, months, days } = calculateAge(
      parseInt(date.day),
      parseInt(date.month),
      parseInt(date.year)
    );
    setYearsResult(years);
    setMonthsResult(months);
    setDaysResult(days);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-80 md:max-w-max  bg-white p-8 rounded-lg rounded-br-[5rem] md:p-12'
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
          />
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
            onChange={handleChange}
          />
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
          />
        </label>
      </div>
      <div className='my-12 relative'>
        <hr className='text-lightgrey' />
        <button className='bg-purple rounded-full p-4 absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 md:right-8'>
          <img
            src='/images/icon-arrow.svg'
            alt='icon arrow'
            className='size-7 md:size-10'
          />
        </button>
      </div>
      <div className=''>
        <p className='text-[40px] leading-11 md:text-6xl md:leading-18'>
          <span className='text-purple'>
            {yearsResult ? yearsResult : "--"}
          </span>{" "}
          years
        </p>
        <p className='text-[40px] leading-11 md:text-6xl md:leading-18'>
          <span className='text-purple'>
            {monthsResult ? monthsResult : "--"}
          </span>{" "}
          months
        </p>
        <p className='text-[40px] leading-11 md:text-6xl md:leading-18'>
          <span className='text-purple'>{daysResult ? daysResult : "--"}</span>{" "}
          days
        </p>
      </div>
    </form>
  );
}
