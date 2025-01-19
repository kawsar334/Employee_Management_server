# Backend Project  

This repository contains the backend implementation of the project. It provides the necessary APIs and logic to power the frontend application and manage data efficiently.  


---

## Features  
- **User Management:** Handles user registration, login, and authentication using JWT.  
- **Secure API:** Protected routes with role-based access control.  
- **Database Integration:** CRUD operations using MongoDB.  
- **Error Handling:** Centralized error handling for seamless debugging.  
- **Media Uploads:** Image and file uploads using Cloudinary.  
- **Order Management:** Admin and customer functionalities for handling orders.  

---

## Technologies Used  
- **Node.js**: JavaScript runtime environment.  
- **Express.js**: Backend web framework for building APIs.  
- **MongoDB**: NoSQL database for data storage.  
- **Mongoose**: Object data modeling (ODM) library for MongoDB.  
- **JWT**: For secure authentication.  
- **Cloudinary**: For handling media uploads.  
- **bcrypt.js**: For hashing passwords securely.  

---

## API Endpoints  
### User APIs  
- `POST /api/users/register` - Register a new user.  
- `POST /api/users/login` - Authenticate a user.  

### Product APIs  
- `GET /api/products` - Retrieve all products.  
- `POST /api/products` - Add a new product (admin only).  

### Order APIs  
- `POST /api/orders` - Place a new order.  
- `GET /api/orders` - Retrieve all orders (admin only).  

---

## Links  
- **Live API**: [Live Backend Link](https://reliable-eclair-d8edc7.netlify.app/)  

- **Backend GitHub Repository**: [Backend Repository Link](https://github.com/Programming-Hero-Web-Course4/b10a12-server-side-kawsar334)  
- **Frontend GitHub Repository**: [Frontend Repository Link](https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-kawsar334)  

---

## Getting Started  

### Prerequisites  
Ensure you have the following installed:  
- Node.js (v16+ recommended)  
- MongoDB (local or cloud-based)  

### Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-backend-repo-link  
   cd project-folder  
