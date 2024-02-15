# YesGoBus

Application offering Ticket Booking service for Buses

# Overview

## 1. About

The main feature of the application is to provide a ticket booking functionality for Buses. This is acheived using APIs from Bus vendors - VRL, SRS, Seat Seller. Cab booking is also a part of the platform and as such the repository includes some pages designed for cabs (Mobile View Only). 

The Admin/Business Development Associates(BDA) pages are also a part of the repository.

The Bus Booking part and Admin/BDA part are functional.


## 2. Frontend

Project is setup using [Vite](https://vitejs.dev/) for frontend tooling. Main libraries used to build the application are - 

- React
- [React-router-dom v6](https://reactrouter.com/en/main)
- [React Icons](https://react-icons.github.io/react-icons/)   
- [React Hot Toast](https://react-hot-toast.com/)

Styling and Component libraries

- [Tailwind CSS for Vite](https://tailwindcss.com/docs/guides/vite)
- [Ant Design](https://ant.design/)

**Note:** Tailwind Preflight is disabled as it was added much later into the project. So the Box sizing to Border-box is not applied and could couse bugs when working with fixed height/width to a UI component.

When writing this document, tailwind is being used only for layout and introduce Brand-colors. Same Brand Colors have been configured to AntD Config Provider in **main.jsx**. 

The application is also built for Android devices using [Capacitor](https://capacitorjs.com/).

Please refer package.json for further dependancies that supplment the application.

## 3. YesGoBus - Bus Booking Flow

General Flow

1. Landing Page
    - Search Locations, select dates and hit Search.
2. If logged in - 
    - Redirects to Bus Booking Page
    - If not logged in, redirects to login Page.
3. Bus Booking Page
    - Select filters - Drop location, Pickup location, Bus Partner and Price Range.
    - Modify dates.
    - Sort bus list by Price.
    - Select Bus from the list of Buttons.
    - Select Seats, Pickup and Drop locations.
    - Hit Continue.
4. Payment Page
    - Review Booking details.
    - Fill in Passenger details.
    - Check Total amount and Hit Pay Amount.
5. Pay using Payment Gateway
    - if successfull - Show Payment Success Page
    - else - Show Payment Failure Page
6. Payment Success Page
    - View/Download Ticket.

# Folder Structure

```
/
|__/api
|__/client

```
Frontend parts of the application is an **client** folder and the **api** folder contains the backend parts

## Frontend

```
/client
|__/src
    |__/api
    |__/assets
    |__/components
    |__/constants
    |__/pages
    |__/routes
    |__/stores
    |__/utils
    |__App.jsx
    |__App.scss
    |__index.css
    |__main.jsx
```

### 1. /api

Contains functions making AJAX request calls to backend. The calls are divided into 4 files - 
- admin.js - contains calls for Admin/BDA part of the application
- authentication.js - contains Google and Facebook OAuth calls
- srsBusesApis.js - contains calls to SRS Api.
- vrlBusesApis.js - contains calls to VRL Api

### 2. /assests

Contains static assets used across the pages. **May contain unused assets**

### 3. /components

Contains UI components used across the pages.

### 4. /constants

Contains static text data that are imported and rendered in - Privacy, Security Safeguards, Terms of Service Pages.

### 5. /pages

```
/pages
|__Admin
    |__<AdminPages>
|__Cabs
    |__<CabPages>
|__CabDriver
    |__<Driver side CabPages>
|__<Rest of the Pages>
```
#### a. Rest of the Pages

Folders for Landing, Public Pages, 404 page, and other pages related to Bus Booking.

#### b. Admin

Contains pages of Admin/BDA part of the application.

#### c. Cab

Contains pages for the Cab Booking Service part of the application.

#### d. CabDriver

Contains pages for Cab Driver part of the application.

### 6. /routes

Contains Routes for Admin Part and Cab part of the application.

### 7. /stores

Folder for Redux Toolkit Store.

### 8. /utils

Contains Helper functions used across pages.

# Run Locally

Clone the project

```bash
  git clone https://github.com/the-capital-hub/yesgobus-seatseller
```

Go to the project directory

For frontend

```bash
  cd my-project/client
```

For backend

```bash
  cd my-project/api
```

Install dependencies

```bash
  npm install
```

Start the frontend server

```bash
  npm run dev
```

Start the backend server

```bash
  npm run start
```

# Author

[srihari-m-s](https://github.com/srihari-m-s) - Front-end Developer at [The Capital HUB](https://www.linkedin.com/company/thecapitalhub/).