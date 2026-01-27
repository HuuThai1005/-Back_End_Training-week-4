# Week 3 Backend Project

## Summary
A simple REST API built with Express, TypeScript, Drizzle ORM, and PostgreSQL.
The project focuses on clean architecture, structured logging, centralized error handling, and authentication middleware.

---

## Features
- User register
- User login
- JWT authentication
- Protected book APIs
- Create book
- Update book
- Delete book
- List books
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

---

## Setup

### Requirements
- Node.js >= 18
- Bun
- PostgreSQL >= 14

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




