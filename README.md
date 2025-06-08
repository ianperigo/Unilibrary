# UniLibrary Project

## Overview
UniLibrary is a web application that provides a platform for managing a collection of books and user authentication. It implements CRUD (Create, Read, Update, Delete) functionality for the book collection and user management.

## Project Structure
The project is organized into several directories and files:

```
unilibrary
├── src
│   ├── config
│   │   └── database.js          # Database configuration and connection
│   ├── controllers
│   │   ├── acervoController.js  # Controller for managing the acervo (collection)
│   │   └── authController.js    # Controller for user authentication
│   ├── models
│   │   ├── Acervo.js            # Model representing the acervo data
│   │   └── Usuario.js           # Model representing the user data
│   ├── routes
│   │   ├── acervoRoutes.js      # Routes for acervo resource
│   │   └── authRoutes.js        # Routes for authentication
│   └── app.js                   # Main application file
├── .env                          # Environment variables
├── package.json                  # NPM configuration file
├── README.md                     # Project documentation
└── server.js                     # Entry point of the application
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd unilibrary
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your database connection string and any other necessary environment variables.

4. **Run the Application**
   Start the server by running:
   ```bash
   node server.js
   ```
   The server will listen on port 3000.

## Usage

- **Access the API**
  The API can be accessed at `http://localhost:3000`. 

- **Endpoints**
  - **Acervo (Collection)**
    - `GET /acervo` - Retrieve all items in the collection.
    - `POST /acervo` - Add a new item to the collection.
    - `PATCH /acervo/:id` - Update an existing item by ID.
    - `DELETE /acervo/:id` - Remove an item from the collection by ID.

  - **Authentication**
    - `POST /login` - Authenticate a user.
    - `POST /register` - Register a new user.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.