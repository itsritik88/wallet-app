# Wallet App README

## Overview

This document provides a comprehensive overview of the Wallet App, including its features, technology stack, installation guide, and project structure. This app is designed to manage user balances, track transactions, and handle JWT authentication.

## Features

* **JWT Authentication:** Secure user authentication using JSON Web Tokens.
* **Balance Tracking:** Real-time tracking of user balances.
* **Transaction Management:** Logging and management of user transactions.
* **User Management:** Functionality for adding and retrieving user data.
* **Backend API:** A robust backend API built with Node.js and Express.js.
* **Database Integration:** Uses MongoDB for data persistence.

## Tech Stack

### Frontend

* **Language:** JavaScript
* **Framework:** (The provided code doesn't show a specific frontend framework, but it's likely a simple HTML/CSS/JS structure or could be extended with React, Vue, or Angular)

### Backend

* **Language:** JavaScript
* **Framework:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT

## Project Structure
wallet-app/
├───backend/
│   ├───config/          # Configuration files (e.g., database config)
│   │   └───database.js
│   ├───controllers/     # Handles business logic for routes
│   │   ├───authController.js
│   │   └───userController.js
│   ├───middlewares/     # Custom middleware functions
│   │   └───authMiddleware.js
│   ├───models/         # Defines the structure of data (schemas)
│   │   ├───transaction.js
│   │   ├───user.js
│   │   └───wallet.js
│   ├───routes/          # Defines API endpoints
│   │   ├───authRoutes.js
│   │   └───userRoutes.js
│   ├───utils/           # Utility functions
│   │   └───jwtUtils.js
│   ├───server.js        # Entry point for the backend server
│   │   └───index.js     # alternative entry point
│   └───package.json     # Node.js project configuration
│
└───frontend/          # (If a frontend framework is used, otherwise, it might contain HTML, CSS, and JS files)
│   # Example structure (if React were used)
│   ├───public/
│   │   └───index.html
│   ├───src/
│   │   ├───App.js
│   │   ├───components/
│   │   │   └───...
│   │   └───index.js
│   └───package.json
│
└───README.md         # Project documentation (this file)

## Installation Guide

### Prerequisites

* Node.js installed
* MongoDB installed and running
* (Optional) A modern web browser for the frontend

### Backend Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/itsritik88/wallet-app.git]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure the database:**

    * Copy `config/database.js` and modify it with your MongoDB connection details. (The provided code directly uses `mongodb://localhost:27017/wallet-app`)

    ```javascript
    // config/database.js
    module.exports = {
        url: 'mongodb://localhost:27017/wallet-app' // Change this if needed
    };
    ```

4.  **Set up environment variables:**

    * Create a `.env` file in the `backend` directory.
    * Add the following (or modify as needed):

        ```
        PORT=3000 # Or any other port
        JWT_SECRET=your-secret-key # Change this to a strong, random string
        ```

5.  **Run the backend server:**

    ```bash
    npm start
    ```

    The server should now be running at `http://localhost:3000` (or the port you configured).

### Frontend Setup (If applicable)

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install dependencies (if applicable, e.g., for React):**

    ```bash
    npm install
    ```

3.  **Configure the API endpoint:**

    * If using a framework like React, ensure your API calls point to the correct backend URL (e.g., `http://localhost:3000`).

4.  **Run the frontend (if applicable):**

    ```bash
    npm start # Or yarn start, depending on the project
    ```

    The frontend should open in your browser.

## Configuration

* **Database Configuration:** The database connection URL is configured in `backend/config/database.js`. Ensure this points to your MongoDB instance.
* **Port Configuration:** The server port can be changed by setting the `PORT` environment variable in a `.env` file in the `backend` directory.
* **JWT Secret:** The `JWT_SECRET` environment variable in the `.env` file is crucial for signing and verifying JWTs. **Change this to a strong, random string for security.**

## API Endpoints

The backend provides the following API endpoints:

* `POST /api/auth/signup`: Register a new user.
    * Request Body: `{ username, email, password }`
    * Response: `{ token, user }` (on success)
* `POST /api/auth/login`: Log in an existing user.
    * Request Body: `{ email, password }`
    * Response: `{ token, user }` (on success)
* `GET /api/users/add`: Adds a user.
    * Request Headers: `Authorization: Bearer <token>`
    * Response: `{ message: "User Added successfully", user }`
* `GET /api/users/`: Retrieves all users.
    * Response: `[ { user }, {user}, ...]`
* `GET /api/user/:id`: Retrieves a single user by ID.
    * Response: `{ user }`
* `POST /api/wallet/create`: Creates a wallet for a user.
    * Request Headers: `Authorization: Bearer <token>`
    * Request Body: `{ userId }`
    * Response: `{ wallet }`
* `GET /api/wallet/:id`: Retrieves a wallet by ID.
     * Response: `{ wallet }`
* `POST /api/transaction/create`: Creates a new transaction
    * Request Headers: `Authorization: Bearer <token>`
    * Request Body: `{ walletId, amount, type }`
    * Response: `{ transaction }`
* `GET /api/transaction/:id`: Retrieves a transaction by ID.
     * Response: `{ transaction }`

## Authentication

* The API uses JWT (JSON Web Tokens) for authentication.
* Upon successful signup or login, the server returns a JWT.
* This JWT must be included in the `Authorization` header of subsequent requests to access protected routes (e.g., creating a wallet, making a transaction).
* The header should be in the format: `Authorization: Bearer <token>`.

## Security Considerations

* **JWT Secret:** The `JWT_SECRET` is critical. Use a strong, random, and securely stored secret. **Do not expose it in your code.**
* **Password Hashing:** Ensure that passwords are securely hashed (e.g., using bcrypt) before storing them in the database. (The provided code uses bcrypt)
* **Input Validation:** Implement robust input validation to prevent vulnerabilities like SQL injection and cross-site scripting (XSS).
* **HTTPS:** Use HTTPS to encrypt communication between the client and server, especially when handling sensitive data like passwords and tokens.
* **Error Handling:** Implement proper error handling to prevent exposing sensitive information in error messages.
* **Rate Limiting:** Consider implementing rate limiting to protect your API from brute-force attacks.

## Areas for Improvement

* **Frontend Framework:** Consider using a modern frontend framework like React, Vue, or Angular to build a more interactive and maintainable user interface.
* **Testing:** Implement unit and integration tests to ensure the reliability of your code.
* **Documentation:** Expand the API documentation (e.g., using Swagger or OpenAPI) to make it easier for other developers to use your API.
* **Authorization:** Implement more fine-grained authorization (e.g., using roles and permissions) to control access to specific resources.
* **Real-time Updates:** For a more dynamic wallet application, consider using WebSockets to provide real-time updates of balances and transactions.
* **Payment Gateway Integration:** Integrate with a real payment gateway (e.g., Stripe, PayPal) to enable actual transactions.
* **User Interface:** The provided code lacks a frontend, so a user interface needs to be built.
* **Complete Transaction Logic**: The transaction logic in the backend needs to be implemented. It should deduct the amount from one wallet and add it to another.
* **Error Handling**: The application needs more robust error handling.
* **Validation**: The application needs more robust validation of user inputs.
