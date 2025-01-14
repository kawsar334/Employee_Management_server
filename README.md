
# Online Tutor Booking Platform - Backend

This is the **backend** repository for the Online grocery ecommerce. It handles the server-side logic, database operations, and API endpoints to support the frontend functionalities. The backend is built using **Node.js** and **Express.js**, with **mongoose** as the database.


## Links
**Backend Links**
- [backend github link]()
- [api Link on vercel]() +/endpoind 


**frontend Links**

- [Live Link1]()

- [frontend github link]()


## **Features**
- 🔒 **Authentication System**:
  - JWT-based authentication for secure access
- 📦 **API Endpoints**:
  - CRUD operations for users, tutors, and bookings
- 🔍 **Search Functionality** for filtering products

- 📊 **Data Management**:
  - create product update, delete read
- 🌐 Secure and production-ready server with proper error handling
- 🔄 **Pagination** 

---


## **Technologies Used**
- **Node.js** for server-side scripting
- **Express.js** for API and routing
- **MongoDB** with **Mongoose** for database management
- **JWT Authentication** for secure private routes
- **dotenv** for environment variable management
- **CORS** for handling cross-origin requests



## **API Endpoints**



### **Authentication** ======================================== ##
- **Register a User  ##POST##**  
  `https://server-anud.vercel.app/api/auth/register`  
  Registers a new user in the system.

- **Login  ##POST##**  
   `https://server-anud.vercel.app/api/auth/login`
  Authenticates a user and provides a JWT token.
  - **Login with google information store on database. ##POST##**  
   `https://server-anud.vercel.app/api/auth/google`
  

- **Logout ##POST##**  
  `https://server-anud.vercel.app/api/auth/logout`  
  Logs out the user and clears the authentication token from cookies.

  ## ===========================user Related APIS=========================== ##
  - **UPDATE a User BY userId ##PUT##**  
  `https://server-anud.vercel.app/api/user/update/{id}`  
 - **delete a user by ID ##DELETE##**  
  `https://server-anud.vercel.app/api/user/{id}`  

 - **get single user by ID ##Get##**  
  `https://server-anud.vercel.app/api/user/find/{id}`


 - **get All user  ##Get##**  
  `https://server-anud.vercel.app/api/user/userList`

 - **get user stats  ##Get##**  
  `https://server-anud.vercel.app/api/user/stats`

 - **updated a specefic user profile picture  ##Put##**  
  `https://server-anud.vercel.app/api/user/updatedprofilepic/{userId}`



  ## ===========================PRODUCT Related APIS=========================== ##


 - **create a New product   ##Post##**  
  `https://server-anud.vercel.app/api/product/createproduct`

- **update specepic  product  by ID ##Put##**  
  `https://server-anud.vercel.app/api/product/updateProduct/{id}`


- **delete specepic  product  by ID ##delete##**  
  `https://server-anud.vercel.app/api/product/{id}`

- **Get specepic  product  by ID ##Get##**  
  `https://server-anud.vercel.app/api/find/product/{id}`

- **Get All  product   ##Get##**  
  `https://server-anud.vercel.app/api/product/productList`


