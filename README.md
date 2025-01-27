# Backend Project  

This repository contains the backend implementation of the project. It provides the necessary APIs and logic to power the frontend application and manage data efficiently.  

## Links  
- **Live API**: [Live Backend Link](https://reliable-eclair-d8edc7.netlify.app/)  

- **Backend GitHub Repository**: [Backend Repository Link](https://github.com/kawsar334/Employee_Management_server)  
- **Frontend GitHub Repository**: [Frontend Repository Link](https://github.com/kawsar334/Employee_Management_Client)  
---

## Features

- **User Authentication**: 
  - Registration and login functionality with JWT-based authentication.
  - Google login for quick authentication without needing a password.
  - JWT token validation for protected routes.

- **Admin Panel**:
  - Admins can view and manage all users (employee list).
  - Ability to update user status (fired/unfired).
  - Option to promote users to HR roles.
  - Admins can adjust salaries for employees.
  - View and manage payment history for all users.

- **Employee Dashboard**:
  - Employees can view their payment history.
  - Access to personal details and updates.

- **HR Dashboard**:
  - View and manage employee details.
  - Access payment history and update payment statuses.
  - Ability to interact with employee reports/messages.

- **Message System**:
  - Users can send messages to report issues to the admin.
  - Admin can view all incoming messages in the admin dashboard.

- **Payment Management**:
  - Employees can create payment records.
  - Admin can view payment history and update payment statuses.
  - Track payment details by employee and status.


---

## Technologies

- **Node.js**: JavaScript runtime environment for building the backend API.
- **Express.js**: Web framework for Node.js used to build the API routes.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **MongoDB**: NoSQL database for storing user, payment, and employee data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, used for interacting with the database.
- **Bcrypt.js**: Password hashing library used for securely storing and verifying user passwords.
- **Google OAuth**: Enables Google login for users to authenticate without a password.
- **Axios**: For handling HTTP requests between the frontend and backend (used for communication in some parts of the application).
- **Dotenv**: For managing environment variables (e.g., JWT secret, database URL).

---

## API Routes Documentation 
### Authentication Routes  

- `POST /api/auth/register` - Register a new user.  
- `POST /api/auth/login` -  Authenticates a user and returns a token. 
- `POST /api/auth/google` -  Authenticates a user and returns a token. 

- `GET /api/jwt` -  Fetches a JWT token.
- `POST /api/auth/logout` -  Logs out a user by invalidating their token. 

### Authentication Routes  

- `POST /api/auth/send` -  (Public) Sends a message to the admin. Used for reporting purposes.  
- `GET /api/GET /messages` -(Admin Only) Retrieves all messages for the admin dashboard. Requires admin authentication.




### Employee Management Routes (For HR and Admin) 
- `GET /api/getEmployeeDetails/:id` - (HR Only) Retrieves the details of a specific employee. 
- `Get /api/getPaymentHistory` -  (Authenticated User) Retrieves the payment history for the logged-in user.
- `GET /api/details/:slug` - (HR Only) Retrieves user details by slug.. 
- `Get /api/getPaymentHistory` -  (Authenticated User) Retrieves the payment history for the logged-in user.
### Employee   
- `get /api/all-employee-list` -  (Admin Only) Retrieves a list of all employees. Requires admin authentication.  
- `GET /api/fired/:userId` - (Admin Only) Marks an employee as fired. Requires admin authentication. 
- `GET /api/unfired/:userId` - (Admin Only) Reverts the firing status of an employee. Requires admin authentication.
- `put /api/make-hr/:userId` - (Admin Only) Promotes an employee to HR. Requires admin authentication.. 
- `put /api/adjust-salary/:userId` - (Admin Only) Adjusts the salary of an employee. Requires admin authentication.
### Payment Routes (For Admin and Users)
- `POST /createpay/:id` : (Authenticated User) Creates a payment record for a user.
- `GET /payment-history` : (Authenticated User) Retrieves the payment history for the logged-in user.
- `PUT /updatestatusOfPayment/:id` : (Admin Only) Updates the payment status for a user. Requires admin authentication.
---
### Conclusion

This API enables you to handle authentication, messaging, payments, and employee management for your system. Be sure to authenticate the appropriate roles before accessing sensitive endpoints.


---
