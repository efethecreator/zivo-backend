# Zivo Backend

Zivo is a Node.js-based backend API platform that provides appointment, portfolio, employee, and service management for businesses and customers.

## Features

- User management (admin, business owner, customer)
- JWT-based authentication
- Business and employee management
- Service and appointment management
- Portfolio and favorite businesses
- Review and rating system
- Working hours and shift management
- Image upload support with AWS S3
- PostgreSQL & Prisma ORM

## Project Structure

```
├── prisma/                # Prisma schema and migration files
├── src/
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Express middlewares
│   ├── repositories/      # Data access layer
│   ├── routes/            # Express route definitions
│   ├── services/          # Business logic layer
│   ├── utils/             # Utility functions
│   └── server.js          # Application entry point
├── package.json
└── .env                   # Environment variables
```

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/kullanici/zivo-backend.git
   cd zivo-backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file and enter the required environment variables:**
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/zivo
   JWT_SECRET=supersecret
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   AWS_REGION=...
   AWS_BUCKET_NAME=...
   FRONTEND_URL=http://localhost:3000
   ```

4. **Run database migrations:**
   ```sh
   npx prisma migrate deploy
   ```

5. **To add seed data:**
   ```sh
   npm run seed
   ```

6. **Start in development mode:**
   ```sh
   npm run dev
   ```

## API Usage

All endpoints start with `/api/v1/`. For endpoints that require authentication, use the `Authorization: Bearer <token>` header.

## Example Endpoints

- **Register:** `POST /api/v1/auth/register`
- **Login:** `POST /api/v1/auth/login`
- **Update Profile:** `PUT /api/v1/profile`
- **Create Business:** `POST /api/v1/business`
- **Create Appointment:** `POST /api/v1/appointments`
- **Add Review:** `POST /api/v1/reviews`

For more endpoints, check the [src/routes](src/routes) directory.

###

This repository is for the backend part of the Zivo project. Here are the frontend repositories:

- **Mobile App:** https://github.com/efethecreator/zivo-frontend
- **Web For Business:** https://github.com/efethecreator/zivo-business-frontend