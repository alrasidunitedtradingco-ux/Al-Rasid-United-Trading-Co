# Custom Authentication Setup Guide

This project now uses a custom username/password authentication system with a Node.js/Express backend and MongoDB.

**Google Sign-In and Firebase have been removed.**

## Key Features:
- Custom username/password login
- Admin role for managing products and viewing all orders
- Customer role for placing orders and viewing personal order history
- Auto-login using JWT (JSON Web Tokens)
- Data persistence in MongoDB

## How to Use:
1.  **Start your Node.js backend**: Ensure `server.js` is running and connected to MongoDB.
2.  **Open `index.html`**: You will be prompted to sign in or register.
3.  **Register a new account**: Create a username and password. This account will initially have the `customer` role.
4.  **Create an Admin Account**:
    *   Register a new user through the website.
    *   Access your MongoDB database (e.g., using MongoDB Compass).
    *   Find the user you just created in the `users` collection.
    *   Manually update their `role` field from `"customer"` to `"admin"`.
    *   Log in with this updated account to access admin features.

## Troubleshooting:
- **"Could not connect to server"**: Ensure `server.js` is running and MongoDB is active.
- **"Authentication failed"**: Check your username and password.
- **Admin features not visible**: Verify the user's `role` in MongoDB is set to `"admin"`.
<parameter name="filePath">c:\Users\DELL\web test\al-rasid-trading\GOOGLE_SIGNIN_SETUP.md