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

export default calculateAge;