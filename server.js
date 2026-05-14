require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. DATABASE CONNECTION
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('CRITICAL ERROR: Could not connect to MongoDB!');
        console.error('Make sure your MongoDB service is running (e.g., mongod).');
        console.error('Error Details:', err.message);
        process.exit(1); // Stop the server if DB is not available
    });

// Health check route
app.get('/', (req, res) => res.send('Al Rasid API is running...'));

// 2. MODELS

// User Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
});

const User = mongoose.model('User', userSchema);
// Item Model
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    emoji: { type: String, default: '📦' },
    description: { type: String },
    stock: { type: Number, default: 0 },
    seller: { type: String, default: 'Admin' }
});

const Item = mongoose.model('Item', itemSchema);

// Order Model (For sync across devices)
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ // Array of items in the order
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number
    }],
    total: Number,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// 3. MIDDLEWARE

// Authentication Middleware (Verifies JWT)
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send({ error: 'Please authenticate.' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Invalid token.' });
    }
};

// Admin Middleware
const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ error: 'Access denied. Admins only.' });
    }
    next();
};

// 4. ROUTES

// Register
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body; // Role defaults to 'customer'
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

// Login (Auto-login via long-lived JWT)
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ error: 'Invalid login credentials' });
        }
        const token = jwt.sign({ _id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.send({ user: { _id: user._id, username: user.username, role: user.role }, token });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

// Get Shop Items (Public)
app.get('/api/items', async (req, res) => {
    const items = await Item.find({});
    res.send(items);
});

// Add Shop Item (Admin Only)
app.post('/api/items', auth, adminOnly, async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Place Order (Authenticated Customers)
app.post('/api/orders', auth, async (req, res) => {
    try {
        const order = new Order({
            ...req.body,
            userId: req.user._id // Associate order with the logged-in user
        });
        await order.save();
        res.status(201).send(order);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get Order History (Sync across devices)
app.get('/api/orders', auth, async (req, res) => {
    try {
        let query = {};
        if (req.user.role !== 'admin') {
            query = { userId: req.user._id }; // Customers only see their own orders
        }
        const orders = await Order.find(query);
        res.send(orders);
    } catch (e) {
        res.status(500).send();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});