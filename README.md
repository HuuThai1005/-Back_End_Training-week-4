# Week 3 Backend Project

## Summary
A simple REST API built with Express, Drizzle ORM, and PostgreSQL.

## Features
- User register
- User login
- Create book
- Update book
- Delete book
- List books

## Tech Stack
- Node.js / Bun
- Express
- TypeScript
- Drizzle ORM
- PostgreSQL

## Setup
- Node.js >= 18
- Bun
- PostgreSQL >= 14

## Environment Setup 
### Install dependencies
bun install

## Database setup 
### Generate migrations
bun drizzle-kit generate

### Run migrations
bun drizzle-kit migrate 

## API Endpoints

### Auth 
- POST /auth/register
- POST /auth/login

### Books 
- POST /auth/create-book
- GET /auth/books
- POST /auth/delete
- PUT /auth/books/:title




