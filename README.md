# Eyego Internship Task

This repository contains the code for the Eyego Internship Task, a web application built with Next.js. It includes a login system, a data table for product management, a chart for statistics, and a dashboard to integrate these components.

## Implementation Approach

This project was implemented using a modular and scalable approach with Next.js as the core framework. The application follows these key principles:

- **Login System**: Built a RESTful API endpoint (`/api/login`) using Next.js API routes, with Zod for input validation to ensure secure and valid user credentials.
- **Data Management**: Developed a `DataTable` component with CRUD functionality, integrating with a mock API (`fakestoreapi.com`) for product data, and using React state/hooks for dynamic updates.
- **Visualization**: Implemented a `ChartComponent` using Chart.js to display product statistics, ensuring a responsive and interactive UI.
- **Dashboard**: Designed a centralized `Dashboard` page to integrate all components, utilizing React Redux for state management and Tailwind CSS for a modern, responsive layout.

The code is structured in a clean folder hierarchy, with components separated for reusability and API logic isolated for maintainability. Testing and iterative development were prioritized to ensure functionality and user experience.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Features
- User login with email and password validation.
- Data table with CRUD operations (Create, Read, Update, Delete) for products.
- Chart visualization for product statistics.
- Responsive dashboard layout.

## Prerequisites
- Node.js (version 14.x or later)
- npm (comes with Node.js)
- Git (for cloning the repository)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ayasabry2/Eyego_Internship_Task.git
2. Navigate to the project directory:
   cd Eyego_Internship_Task
3. Install the dependencies:
   npm install
4. Ensure you have the following packages installed:
chart.js for chart visualization
react-redux for state management 
## Usage
1. Start the development server:
npm run dev
2. Open your browser and go to http://localhost:3000 to view the app.
3. Use the login page with:
Email: Aya.Sabry@gmail.com
Password: password
4. Access the dashboard to manage products and view charts.
