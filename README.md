# Vcare - Medical Services Reservation Platform

Vcare is a platform that provides medical services at home. Patients can reserve services from doctors, nurses, and physiotherapists, view profiles, read blogs, and more. This project includes a backend built with Node.js and Express.js, and a frontend built with React.

### Backend

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- CORS for handling cross-origin requests

### Frontend

- React
- Axios for HTTP requests

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [MongoDB](https://www.mongodb.com/) (for database)

### Installation

1. **Clone the backend repository**:
   
   git clone https://github.com/your-username/vcare-backend.git
   cd vcare-backend


2. **Install backend dependencies:**:

   npm install

3. **Set up environment variables:**:

```env
- **PORT**: The port on which the server will run.
  - Example: `8080`
  
- **DB_URL**: The connection URL for the MongoDB database.
  - Example: `'mongodb://localhost:27017/vcare-backend'`

- **ACCESS_TOKEN_SECRET_KEY**: The secret key used to sign access tokens.
  - Example: `'your_access_token_secret_key_here'`

- **REFRESH_TOKEN_SECRET_KEY**: The secret key used to sign refresh tokens.
  - Example: `'your_refresh_token_secret_key_here'`

- **ACCESS_TOKEN_EXPIRATION**: The expiration time for access tokens.
  - Example: `'1d'`

- **REFRESH_TOKEN_EXPIRATION**: The expiration time for refresh tokens.
  - Example: `'2d'`
```

3. **Start the backend server:**:
   npm run dev

### API Documentation
