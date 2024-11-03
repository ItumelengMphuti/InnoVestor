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
    origin: 'http://127.0.0.1:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

// Helper function to generate JWT tokens
function generateToken(user, role) {
    return jwt.sign({ id: user.id, role }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
}

// Multer setup for handling file uploads (for profile pictures and pitch decks)
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
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max file size
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
    const {
        name,
        founder_name,
        email,
        password,
        industry,
        location,
        date_founded,
        stage,
        number_of_employees,
        mission,
        financial_stage,
        funding_amount
    } = req.body;

    // Paths for profile picture and pitch deck files
    const profilePicturePath = req.files['profile_picture'] ? req.files['profile_picture'][0].path : null;
    const pitchDeckPath = req.files['pitch_deck'] ? req.files['pitch_deck'][0].path : null;

    try {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query to insert startup data
        const query = `
            INSERT INTO startups 
            (name, founder_name, email, password, profile_picture, industry, location, date_founded, stage, number_of_employees, mission, pitch_deck, financial_stage, funding_amount) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [name, founder_name, email, hashedPassword, profilePicturePath, industry, location, date_founded, stage, number_of_employees, mission, pitchDeckPath, financial_stage, funding_amount];

        // Insert data into the database
        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error', details: err.message });
            }
            res.status(201).json({ message: 'Startup registered successfully!' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred during signup' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
