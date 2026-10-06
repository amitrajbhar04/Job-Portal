# 💼 Job Portal RESTful API

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express-v5.2.1-blue.svg?style=flat-square&logo=express)](https://expressjs.com/)
[![Sequelize ORM](https://img.shields.io/badge/sequelize-v6.37.8-52B0E7.svg?style=flat-square&logo=sequelize)](https://sequelize.org/)
[![MySQL](https://img.shields.io/badge/mysql-8.x-4479A1.svg?style=flat-square&logo=mysql)](https://www.mysql.com/)
[![JWT Auth](https://img.shields.io/badge/auth-JWT-orange.svg?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![License: ISC](https://img.shields.io/badge/license-ISC-green.svg?style=flat-square)](LICENSE)

A robust, role-based backend REST API for a modern Job Portal application. Built with **Node.js**, **Express.js 5**, **Sequelize ORM**, and **MySQL**, this backend provides complete authentication and authorization, job lifecycle management, skill tagging, and candidate application workflows with database-level transaction integrity.

---
## 🌟 Overview

The **Job Portal RESTful API** powers the recruitment lifecycle by connecting **Employers** and **Candidates** through a secure, structured interface:

- **Employers** can create job postings, tag required technical skills, monitor their active listings, and review candidates who applied for their roles.
- **Candidates** can browse all available job vacancies (including hiring company details and required skills), apply for jobs, and monitor their application statuses without duplicate submissions.
- **Role-Based Access Control (RBAC)** ensures that candidates cannot access employer routes and vice versa, while all protected endpoints are secured via JSON Web Tokens (JWT).

---

## ⚡ Key Features

- **Role-Based Access Control (RBAC)**: Strict role separation between **Candidate (`roleId: 1`)** and **Employer (`roleId: 2`)**.
- **Stateless JWT Authentication**: Secure bearer token authorization with 1-day expiration, payload verification, and credential encryption using `bcryptjs`.
- **Relational Data Modeling**: Many-to-Many associations between Jobs and Skills via junction tables (`JobSkills`), and Candidates and Jobs via `AppliedJobs`.
- **ACID Database Transactions**: Critical operations like user registration, job posting with multiple skills, and job applications are wrapped in database transactions to prevent partial writes.
- **Duplicate Application Prevention**: Guards against multiple applications to the same job by the same candidate.
- **Predictable JSON Responses**: Centralized response formatting utility ensures unified success and error structures across all endpoints.
- **Automated Database Management**: Automated migration scripts and seeders for pre-populating system roles and industry-standard technical skills.
---
## 🛠 Tech Stack

| Component | Technology | Version | Description |
| :--- | :--- | :--- | :--- |
| **Runtime** | [Node.js](https://nodejs.org/) | `>= 18.0.0` | JavaScript server runtime environment |
| **Framework** | [Express.js](https://expressjs.com/) | `v5.2.1` | Minimalist web application framework |
| **ORM** | [Sequelize](https://sequelize.org/) | `v6.37.8` | Feature-rich promise-based Node.js ORM |
| **Database CLI** | [Sequelize CLI](https://github.com/sequelize/cli) | `v6.6.5` | CLI migrations, models & seeders tooling |
| **Database Driver** | [mysql2](https://github.com/sidorares/node-mysql2) | `v3.24.5` | High-performance MySQL client for Node.js |
| **Authentication** | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | `v9.0.3` | JWT implementation for stateless user sessions |
| **Hashing** | [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | `v3.0.3` | Password hashing function with salt rounds |
| **Environment** | [dotenv](https://github.com/motdotla/dotenv) | `v18.0.5` | Zero-dependency `.env` file loader |
| **Dev Tooling** | [nodemon](https://nodemon.io/) | `v3.1.14` | Auto-restarting development server on file save |

---
## 🚀 Getting Started

Follow the step-by-step instructions below to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (Version 18.x or higher)
- [npm](https://www.npmjs.com/) (Version 9.x or higher)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) (Running locally or accessible via network on port `3306`)

---

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/amitrajbhar04/Job-Portal.git
   cd Job-Portal
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example `.env.example` file to create your `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and configure your settings (see [Environment Configuration](#-environment-configuration)).

4. **Configure MySQL Database Connection:**
   Open `config/config.json` and ensure the database credentials match your local MySQL configuration:
   ```json
   {
     "development": {
       "username": "root",
       "password": "YOUR_MYSQL_PASSWORD",
       "database": "hiring_solution",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```

5. **Create the MySQL Database:**
   Log into your MySQL client and create the database if it doesn't already exist:
   ```sql
   CREATE DATABASE IF NOT EXISTS hiring_solution;
   ```
   *(Alternatively, run: `npx sequelize-cli db:create`)*

---

### Database Migration & Seeding

Run the Sequelize migrations to generate all database tables, foreign keys, and indexes:

```bash
# Run all pending database migrations
npx sequelize-cli db:migrate

# Seed roles (Candidate, Employer) and initial Skills into the database
npx sequelize-cli db:seed:all
```

---

### Running the Application

- **Development Mode (with auto-reload on file changes):**
  ```bash
  npm run dev
  ```

- **Production Mode:**
  ```bash
  npm start
  ```

Once running, the server will output:
```text
Server running on http://localhost:3000
```

---

## 🧪 Testing with cURL

Below are quick cURL commands for manual testing:

### 1. Register Candidate
```bash
curl -X POST http://localhost:3000/api/auth/registration \
  -H "Content-Type: application/json" \
  -d '{"name":"Candidate User","email":"candidate@example.com","phone":"1234567890","password":"password123","roleId":1}'
```

### 2. Register Employer
```bash
curl -X POST http://localhost:3000/api/auth/registration \
  -H "Content-Type: application/json" \
  -d '{"name":"Employer Org","email":"employer@example.com","phone":"9876543210","password":"password123","roleId":2}'
```

### 3. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"employer@example.com","password":"password123"}'
```

### 4. Create Job (Employer)
```bash
curl -X POST http://localhost:3000/api/employer/job-create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <EMPLOYER_TOKEN>" \
  -d '{"jobName":"Backend Engineer","salary":75000,"description":"Node.js expert needed","skills":[1,4,8]}'
```

### 5. Browse Jobs (Candidate)
```bash
curl -X GET http://localhost:3000/api/candidate/get-jobs \
  -H "Authorization: Bearer <CANDIDATE_TOKEN>"
```

### 6. Apply to Job (Candidate)
```bash
curl -X POST http://localhost:3000/api/candidate/applied-job \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <CANDIDATE_TOKEN>" \
  -d '{"jobApplicationId":1}'
```

---

## 🛠 Sequelize CLI Cheat Sheet

For ongoing database maintenance and schema changes:

```bash
# Run all pending migrations
npx sequelize-cli db:migrate

# Roll back the most recent migration
npx sequelize-cli db:migrate:undo

# Roll back all migrations
npx sequelize-cli db:migrate:undo:all

# Run all seed files
npx sequelize-cli db:seed:all

# Undo the last seed file
npx sequelize-cli db:seed:undo

# Generate a new migration
npx sequelize-cli migration:generate --name add-status-to-jobs

# Generate a new model
npx sequelize-cli model:generate --name Company --attributes name:string,website:string
```

---