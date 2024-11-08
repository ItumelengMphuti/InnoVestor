const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// MYSQL CONNECTION
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'innovestor_connect'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Helper function to generate JWT tokens
function generateToken(user, role) {
    return jwt.sign({ id: user.id, role }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
}

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images (JPEG, PNG) and PDF files are allowed.'));
        }
    }
});

// Route for handling startup signup
app.post('/startups', upload.fields([{ name: 'profile_picture' }, { name: 'pitch_deck' }]), async (req, res) => {
    try {
        const { startup_name, founder_name, email, password, confirm_password, industry, location, datefounded, stage, employee_count, mission, financial_stage, funding_amount } = req.body;

        // Validate input
        if (!startup_name || !founder_name || !email || !password || !confirm_password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (password !== confirm_password) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store data in the database
        const profilePicturePath = req.files['profile_picture'] ? req.files['profile_picture'][0].path : null;
        const pitchDeckPath = req.files['pitch_deck'] ? req.files['pitch_deck'][0].path : null;

        const query = `INSERT INTO startups (startup_name, founder_name, email, password, profile_picture, industry,
                        location, date_founded, stage, employee_count, mission,
                        pitch_deck, financial_stage, funding_amount)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [startup_name, founder_name, email.toLowerCase(), hashedPassword,
                        profilePicturePath, industry, location,
                        datefounded, stage, employee_count,
                        mission, pitchDeckPath,
                        financial_stage, funding_amount];

        connection.query(query, values, (error) => {
            if (error) {
                console.error('Error inserting data into the database:', error);
                return res.status(500).json({ message: 'Database error.' });
            }
            res.status(201).json({ message: 'Signup successful!' });
        });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Mentor Signup Route
app.post('/mentor-signup', upload.single('profile_picture'), async (req, res) => {
    try {
        const { name, email, password, cpassword, company_name, position, linkedin, expertise, experience, availability, preferred_stage, mentorship, location } = req.body;
        if (password !== cpassword) return res.status(400).json({ error: "Passwords do not match" });
        
        const hashedPassword = await hashPassword(password);
        const profilePicturePath = req.file ? req.file.path : null;

        const sql = `INSERT INTO mentors (name, email, password, company_name, position, linkedin, expertise, experience, availability, preferred_stage, mentorship, location, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [name, email, hashedPassword, company_name, position, linkedin, expertise, experience, availability, preferred_stage, mentorship, location, profilePicturePath];
        
        db.query(sql, values, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Mentor registered successfully!' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Investor Signup Route
app.post('/investor-signup', upload.single('profile_picture'), async (req, res) => {
    try {
        const { name, email, password, cpassword, compname, site, years, companies } = req.body;
        if (password !== cpassword) return res.status(400).json({ error: "Passwords do not match" });

        const hashedPassword = await hashPassword(password);
        const profilePicturePath = req.file ? req.file.path : null;

        const sql = `INSERT INTO investors (name, email, password, company_name, website, investing_experience, portfolio_companies, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [name, email, hashedPassword, compname, site, years, companies, profilePicturePath];
        
        db.query(sql, values, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Investor registered successfully!' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});