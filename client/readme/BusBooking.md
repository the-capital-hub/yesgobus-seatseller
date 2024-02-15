# YesGoBus - Bus Booking

## 1. Flow

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

## 2. Pages

1. BusBooking
2. Payment
3. PaymentSuccess
4. PaymentFailure
5. TicketView
6. Profile
7. Login

### 2-1. BusBooking

Needs **major maintainance**.

- Code here does not follow Single Responsibility Principle (Too many functionalities are handled in this page).
- Contains a lot of helper functions that format data. Some of them have been relocated to a file under ```/src/utils```.
- Bus Partner API calls are made separately and response is stored in separate useStates. Ideally, all this would be abstracted away and frontend would just recieve a list of buses to show.
- Each Partner APIs have unique varibale names for similar things such as travel duration, boarding point, disembarking point etc. Hard to keep track of them. Ideally, the the unique names could be mapped to common names for frontend, including a flag indicating to which API the bus would belong to.
- Sort by Price Functionality is implemented and works on VRL and SRS buses. The Seat Seller buses are rendered from a separate state and not passed to sorting function. Hence, Price sorting does not work on them.
- BusBookingCard and Seats Components are also complex and very long. Need to break them down.

### 2-2. Payment

Needs **major maintainance**.

- Does not follow react Best Pracices (Too many functionalities are handled in this page).
- Many things could be refactored to their own components.
- Proper Payment Structure of the platform is not given by the client.
- Contains a  lot of unused/commented code.

### 2-5. TicketView

Needs maintainance.

- Most of the markup can be refactored to their own components.

### 2-7. Login

Needs Maintainance.

- Page is very long and contains code for Login and Sign up. Should be refactored to their own components.

## Further Notes

- The project would benefit from a High level system design.
- The Bus Booking routes need a Layout that checks for authentication and sets a common layout for the Bus Booking pages.
- This is just my opinion - Project contains code specific to Mobile devices(not view/screens) like Voice Search Input that uses a capacitor plugin. If a mobile version of the application is needed, a separate project that could use the same backend APIs using Ionic or React-Native would be ideal.

# Author

[srihari-m-s](https://github.com/srihari-m-s) - Front-end Developer at [The Capital HUB](https://www.linkedin.com/company/thecapitalhub/).
