# JWT Authentication API

This project is a basic **REST API** that implements authentication using **JWT (JSON Web Token)**. The backend is built with **Node.js** and **Express**, and it uses **JWT** to handle user sessions securely.

## 🚀 Description

This server allows users to **login** and obtain a **JWT token**, which can then be used to access protected routes.

### Features:
- **Login**: The user can log in by providing a `username` and `password`. If the credentials are correct, a **JWT token** is generated.
- **Protected Route**: To access protected routes, the JWT token must be sent in the request headers.

## 📦 Requirements

- **Node.js** 
- **npm** 

### 📋 **Postman Example:**

Here's a guide for **Postman**:
1. **Login**: Send a `POST` request to `http://localhost:3000/login` with the credentials in JSON.

- **Method**: `POST`
   - **URL**: `http://localhost:3000/login`
   - **Body**: 
     - Select **raw** and **JSON** format in Postman.
     - Paste the following JSON:
       ```json
       {
         "username": "administrator",
         "password": "@min01!"
       }
       ```

2. **Get the token**

   - **Response**: You'll get a JWT token:
     ```json
     {
       "token": "..."
     }
     ```

3. **Protected route**: Send a `GET` request to `http://localhost:3000/profile` with the token in the `Authorization` header.

- **Method**: `GET`
   - **URL**: `http://localhost:3000/profile`
   - **Headers**: 
     - Key: `Authorization`
     - Value: `Bearer YOUR_TOKEN`
       - Replace `YOUR_TOKEN` with the token you got in the login response.

   - **Response**: If the token is valid, you'll see:
     ```json
     {
       "message": "Access granted",
       "user": {
         "id": 1,
         "username": "administrator",
         "role": "Administrator"
       }
     }
     ```

