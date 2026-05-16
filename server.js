require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// 1. DATABASE CONNECTION
const MONGODB_URI = process.env.MONGODB_URI;
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
    role: { type: String, default: 'customer' }, // 'admin' or 'customer'
    createdAt: { type: Date, default: Date.now }
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
    customerName: String,
    phone: String,
    address: String,
    dropOffLocation: String,
    items: [{ // Array of items in the order
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number
    }],
    total: Number,
    userId: mongoose.Schema.Types.ObjectId,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// 4. ROUTES

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret');
        res.status(201).send({ token, user: { _id: user._id, username: user.username, role: user.role } });
    } catch (e) { res.status(400).send({ error: 'Username already exists' }); }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret');
        res.send({ token, user: { _id: user._id, username: user.username, role: user.role } });
    } catch (e) { res.status(500).send(e); }
});

app.get('/api/auth/me', async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findById(decoded.id);
        if (!user) throw new Error();
        res.send({ _id: user._id, username: user.username, role: user.role });
    } catch (e) { res.status(401).send({ error: 'Please authenticate' }); }
});

// Get Shop Items (Public)
app.get('/api/items', async (req, res) => {
    const items = await Item.find({});
    res.send(items);
});

// Add Shop Item (Admin Only)
app.post('/api/items', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Place Order (Authenticated Customers)
app.post('/api/orders', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get Order History (Sync across devices)
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find({});
        res.send(orders);
    } catch (e) {
        res.status(500).send();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});