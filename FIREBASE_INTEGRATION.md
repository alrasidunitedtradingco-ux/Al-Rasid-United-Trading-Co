# Firebase Integration - REMOVED

**Firebase has been removed from this project.**

The project now uses a custom Node.js/Express backend with MongoDB for:
- **Custom Username/Password Authentication**
- **Admin and Customer Roles**
- **Persistent Storage** for users, items, and orders
- **Auto-login** using JWT (JSON Web Tokens)

## Why the Change?
The previous Firebase integration was for Google Sign-In and was not fully integrated with a persistent database for products and orders. To provide a more complete and customizable backend solution, Firebase has been replaced with a self-hosted Node.js/Express/MongoDB setup.

## What This Means for You:
- **No Firebase Setup Required**: You no longer need to create a Firebase project or configure its services.
- **Full Control**: You have complete control over your authentication logic and database schema.
- **Local Development**: Your backend runs locally, making development and debugging easier.

## How to Use the New System:
1.  **Start your Node.js backend**: Ensure `server.js` is running and connected to MongoDB.
2.  **Open `index.html`**: You will be prompted to sign in or register.
3.  **Register a new account**: This will create a user with the `customer` role.
4.  **Create an Admin Account**:
    *   Register a new user through the website.
    *   Access your MongoDB database (e.g., using MongoDB Compass).
    *   Find the user you just created in the `users` collection.
    *   Manually update their `role` field from `"customer"` to `"admin"`.
    *   Log in with this updated account to access admin features (like adding products and viewing all orders).

## Relevant Files:
- `server.js`: Contains all backend logic, including authentication, user/item/order models, and API routes.
- `index.html`: Contains the frontend logic, including the login/registration UI, API calls, and role-based UI elements.
- `.env`: Stores your MongoDB connection string and JWT secret.

---

**For more details on the new custom authentication and backend setup, please refer to `server.js` and `index.html` directly.**