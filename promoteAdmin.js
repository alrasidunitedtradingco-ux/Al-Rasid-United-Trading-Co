// promoteAdmin.js
require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

// User Model (must match your server.js User model)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' }, // 'admin' or 'customer'
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

const promoteUserToAdmin = async (usernameToPromote) => {
    if (!usernameToPromote) {
        console.error('Error: Please provide a username to promote. Usage: node promoteAdmin.js <username>');
        process.exit(1);
    }

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI is not defined in your .env file.');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for admin promotion.');

        const user = await User.findOne({ username: usernameToPromote });

        if (!user) {
            console.log(`User '${usernameToPromote}' not found.`);
            return;
        }

        if (user.role === 'admin') {
            console.log(`User '${usernameToPromote}' is already an admin.`);
            return;
        }

        user.role = 'admin';
        await user.save();
        console.log(`Successfully promoted user '${usernameToPromote}' to admin!`);

    } catch (error) {
        console.error('An error occurred during promotion:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
};

// Get the username from command line arguments
const username = process.argv[2];
promoteUserToAdmin(username);