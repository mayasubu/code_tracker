require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
const submissionRoutes = require('./routes/submissionRoutes');

const app = express();

app.use(cors({ origin: ['http://localhost:4200', 'http://localhost:5173'], credentials: true }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'codetrack_secret_123',
    resave: false,
    saveUninitialized: false
}));

// Global variables for templates
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Routes mounting
app.use('/', authRoutes);
app.use('/', problemRoutes);
app.use('/', submissionRoutes);

// Static hosting for React Admin Portal
app.use('/admin-static', express.static(path.join(__dirname, 'admin-portal', 'dist')));
// Static hosting for Angular Student Portal
app.use('/student-static', express.static(path.join(__dirname, 'student-portal', 'dist', 'student-portal', 'browser')));

// SPA Fallback for Admin
app.get('/admin/:splat*', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-portal', 'dist', 'index.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-portal', 'dist', 'index.html'));
});

// SPA Fallback for Student (Catch-all except /api)
app.get('/:splat*', (req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(404).json({ success: false, message: 'API Route Not Found' });
    }
    res.sendFile(path.join(__dirname, 'student-portal', 'dist', 'student-portal', 'browser', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// App init
const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/codetrack';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));
