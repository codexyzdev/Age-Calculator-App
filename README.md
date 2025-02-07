# Frontend Mentor "Age Calculator App" Challenge Solution

This solution corresponds to the [Age Calculator App](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q) challenge from Frontend Mentor. The goal is to build an application that allows users to enter a date and see their age in years, months, and days—while displaying validations for invalid data.

## Table of Contents

- [Frontend Mentor "Age Calculator App" Challenge Solution](#frontend-mentor-age-calculator-app-challenge-solution)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Running the Application](#running-the-application)

## Project Description

The application allows the user to:
- Enter the day, month, and year of birth.
- Validate that a correct date is entered.
- Display the calculated age in years, months, and days.
- See animations of the results after the calculation.

The form displays error messages if:
- Fields are missing.
- Values are outside the allowed ranges (e.g., day between 1 and 31, month between 1 and 12).
- The entered date is invalid or set in the future.

## Running the Application

To run the application in development mode, follow these steps:

1. Install the dependencies:
    ```sh
    pnpm install
    ```
2. Start the development server:
    ```sh
    pnpm dev
    ```
3. Open your browser at [http://localhost:4321](http://localhost:4321) to view the application.

To create a production build, run:
```sh
pnpm build