# 📝 Task Manager Full Stack Application

A full-stack Task Manager application built using **Spring Boot (Java)** for the backend and **React (Create React App)** for the frontend.

This project demonstrates secure authentication using **JWT**, user-based authorization, and full CRUD operations with a clean UI.

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- User Login
- Password hashing using BCrypt
- JWT-based stateless authentication
- Protected API endpoints
- User-specific task access

### 📋 Task Management

- Create Task
- View User Tasks
- Update Task Status (PENDING / IN_PROGRESS / DONE)
- Delete Task
- User-level task isolation

### 💻 Frontend

- Login & Register pages
- JWT stored in localStorage
- Axios interceptor for automatic token attachment
- Dashboard with task list
- Status dropdown & colored badges
- Logout functionality
- Clean responsive UI

---

## 🛠 Tech Stack

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT (jjwt)
- Spring Data JPA
- MySQL
- Maven

### Frontend

- React (Create React App)
- Axios
- CSS

---

## 📂 Project Structure

task-manager-fullstack
│
├── backend
│ ├── controller
│ ├── service
│ ├── repository
│ ├── model
│ ├── security
│ └── dto
│
├── frontend
│ ├── pages
│ ├── services
│ └── styles.css
│
└── README.md

---

## ⚙️ Backend Setup

### 1. Navigate to backend folder:

```bash
cd backend

```

### 2. Configure MySQL in:

```bash
src/main/resources/application.properties
```

### Example:

    ```bash
    spring.datasource.url=jdbc:mysql://localhost:3306/task_manager_db
    spring.datasource.username=root
    spring.datasource.password=YOUR_PASSWORD
    spring.jpa.hibernate.ddl-auto=update
    ```

### 3. Run the application:

    ```bash

mvn spring-boot:run
`Backend runs on:
   `bash
http://localhost:8080
```

## ⚙️ Frontend Setup

### 1. Navigate to frontend folder:

        ```bash
        cd frontend
        ```

### 2. Install dependencies:

        ```bash
        npm install
        ```

### 3. Start React app:

````bash
 npm start
 ```

Frontend runs on:
```bash
http://localhost:3000
````

## 🔐 Authentication Flow

1. User registers

2. Password stored as BCrypt hash

3. User logs in

4. JWT token generated

5. Token stored in browser localStorage

6. Axios interceptor attaches token to protected requests

7. Spring Security validates JWT on each request

## 📡 API Endpoints

### Auth

- POST /api/auth/register

- POST /api/auth/login

### Tasks (JWT Required)

- GET /api/tasks

- POST /api/tasks

- PUT /api/tasks/{id}

- DELETE /api/tasks/{id}

## 🧠 Architecture Highlights

- Stateless authentication using JWT

- Custom JWT filter integrated with Spring Security

- Role-based authentication setup

- User-level data isolation

- RESTful API design

- Axios interceptor pattern

- Clean frontend-backend separation

## 🔮 Future Improvements

- Add form validation

- Add task filtering (All / Pending / Done)

- Add pagination

- Improve UI with modern component library

- Deploy backend & frontend to cloud

- Add unit and integration tests

## 👨‍💻 Author

Developed by Sagar Mali
Full Stack Developer (Java + React)

## 📜 License

This project is for educational and portfolio purposes.

---
