# Week 4 Backend Project

## Summary
A simple REST API built with Express, TypeScript, Drizzle ORM, and PostgreSQL.
The project focuses on clean architecture, structured logging, centralized error handling, and authentication middleware.

---

## Features
- User register
- User login
- Change password
- JWT authentication
- Protected APIs
- Create book for admin
- Update book for admin
- Delete book for admin
- List books
- List user account for admin
- Booking book
- View booking history
- Structured logging (request, service, error)
- Centralized error handling with custom AppError

---

## Tech Stack
- Node.js >= 18
- Express
- TypeScript
- Drizzle ORM
- PostgreSQL
- bcrypt
- JWT
- Vitest (testing)
- Docker & Docker Compose
---

## Setup

### Requirements
- Node.js >= 18
- Bun
- PostgreSQL >= 14
- Docker 
---

## Environment Setup

### Install dependencies
bun install

bun install

## Database setup 
### Generate migrations
bun drizzle-kit generate

### Run migrations
bun drizzle-kit migrate 

### Run project 
npm run dev 

### Run test
npx vitest

## Docker setup
### Built & start service 
docker compose up --build
- Service: 
  - API: http://localhost:3000/
  - PostgreSQL: localhost:5432

## Logging & Error Handler
### Logging
- Structured JSON logs
- Log levels: info, warn, error
- Request-based logging with requestId
- Logs include:
  - requestId
  - method
  - path
  - statusCode
  - duration

## Authentication
- JWT-based authentication
- authMiddleware protects book routes
- Token must be sent via:

Authorization: Bearer <token>

## API Endpoints

### Auth 
- POST /auth/register
- POST /auth/login

### Books 
- POST /books/books-create
- GET /books/books
- POST /books/books-delete
- PUT /books/books/:title




