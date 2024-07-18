# Payment Gateway API

This is a Payment Gateway API designed to handle various transaction types and operations.

## Base URL

The API is currently hosted on [https://nexjob.onrender.com](https://nexjob.onrender.com).

## Swagger Documentation

Explore the API endpoints using Swagger UI:
- [Swagger UI](https://nexjob.onrender.com/docs)

## Endpoints

### Authentication

#### Signup
- **POST** `/api/auth/signup`
  - Create a new user account.
  - Requires `name`, `email`, and `password`.

#### Login
- **POST** `/api/auth/login`
  - Authenticate user credentials to obtain access token.
  - Requires `email` and `password`.

#### Logout
- **POST** `/api/auth/logout`
  - Logs out the authenticated user.

### Payment Operations

#### Create Payment
- **POST** `/api/payments`
  - Create a new payment transaction.
  - Requires `amount`, `currency`, and optionally `transactionType`.

#### Process Payment
- **POST** `/api/payments/process/{payment_id}`
  - Process a payment by its ID.

#### Get Payment Status
- **GET** `/api/payments/{payment_id}`
  - Retrieve details of a payment by its ID.

#### Get All Payments
- **GET** `/api/payments`
  - Retrieve a list of all payments.

#### Refund Payment
- **GET** `/api/payments/refund/{payment_id}`
  - Initiate a refund for a payment by its ID.

## Setup Instructions

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables:
   - Create a `.env` file based on `.env.example` and configure MongoDB URI, JWT secret, and other necessary variables.
4. Start the server: `npm start`.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Swagger UI
- JWT for authentication

## License

This project is licensed under the [MIT License](LICENSE).


### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
