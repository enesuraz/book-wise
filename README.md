# [BookWise](https://book-wise-zjam.onrender.com/app)

BookWise is a web application built using React.js, Redux Toolkit, and Tailwind CSS. It allows users to browse through a selection of books, add them to their cart, adjust quantities, and place orders seamlessly.

## Features

- **User-Friendly Interface:** Intuitive design for easy navigation and a pleasant user experience.
- **Dynamic Cart Management:** Users can add, remove, and adjust quantities of books in their cart.
- **Order Placement:** Seamless order placement process with options to input name, telephone number, and address.
- **Location Tracking:** Users can retrieve their current location using the "Get Position" button in the order form.
- **Responsive Design:** Optimized for various screen sizes and devices.

## Technology Used

- **React.js:** Frontend framework for building dynamic user interfaces.
- **Backend with JSON-server:** Utilizes JSON-server as a backend to store books data.
- **Redux Toolkit:** State management library for managing application state efficiently.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **React Router v6:** Routing library for navigation within the application, fetching data from backend and adding-updating to backend.
- **Reusable Components:** utilizes reusable components to maintain a modular and scalable codebase

## Usage

To use BookWise:

- Visit the [BookWise](https://book-wise-zjam.onrender.com/app).
- Browse through the available books on the menu page.
- Type your username Click on a start now to view its details.
- To add a book to your cart, click the "Add Cart" button on the book's details page.
- Navigate to your cart by clicking the "Open Cart" button in the footer.
- In the cart, you can adjust the quantity of each item or remove items entirely.
- When you're ready to place your order, click the "Order Books" button and fill in the required information (name, telephone number, address).
- Optionally, click the "Get Position" button to retrieve your current location for delivery.
- Check the priority box if you need expedited delivery.
- Finally, click the "Place Order" button to complete your purchase.

## Getting Started

To get started with BookWise, follow these steps:

1. Clone the repository: git clone https://github.com/enesuraz/book-wise.git
2. Navigate to the project directory: cd book-wise
3. Install dependencies: npm run install
4. Navigate the frontend/src/services/apiBooks remove comment defined API_URL value and add ${API_URL} value to all fetch request like request example as shown in file
5. Start application in development environment: npm run dev
6. Open your browser and visit website that shown in terminal to view the website.
7. For production: type npm run deploy and open your browser and visit http://localhost:8080(or your_port if you changed it)/app

## Contact

For any inquiries or feedback, please contact [nfk7221@gmail.com](mailto:nfk7221@gmail.com).
