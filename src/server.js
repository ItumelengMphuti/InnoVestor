const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

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

// Helper function to generate JWT tokens
function generateToken(user, role) {
    return jwt.sign({ id: user.id, role }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
}

// REGISTER STARTUP
app.post('/api/startups', async (req, res) => {
    const { name, founder_name, email, password, profile_picture, industry, location, date_founded, stage, number_of_employees, mission, pitch_deck, financial_stage, funding_amount, description } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO startups (name, founder_name, email, password, profile_picture, industry, location, date_founded, stage, number_of_employees, mission, pitch_deck, financial_stage, funding_amount, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        const values = [name, founder_name, email, hashedPassword, profile_picture, industry, location, date_founded, stage, number_of_employees, mission, pitch_deck, financial_stage, funding_amount, description];
        connection.query(query, values, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'Startup registered successfully!' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error hashing password' });
    }
});

// REGISTER INVESTOR
app.post('/api/investors', async (req, res) => {
    const { name, email, password, profile_picture, company_name, website, years_of_experience, portfolio_companies } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO investors (name, email, password, profile_picture, company_name, website, years_of_experience, portfolio_companies) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        
        const values = [name, email, hashedPassword, profile_picture, company_name, website, years_of_experience, portfolio_companies];
        connection.query(query, values, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'Investor registered successfully!' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error hashing password' });
    }
});

// REGISTER MENTOR
app.post('/api/mentors', async (req, res) => {
    const { name, email, password, profile_picture, company_name, position, linkedin, expertise, mentorship_availability, preferred_stage, mentorship_format, location_preference } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO mentors (name, email, password, profile_picture, company_name, position, linkedin, expertise, mentorship_availability, preferred_stage, mentorship_format, location_preference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        const values = [name, email, hashedPassword, profile_picture, company_name, position, linkedin, expertise, mentorship_availability, preferred_stage, mentorship_format, location_preference];
        connection.query(query, values, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'Mentor registered successfully!' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error hashing password' });
    }
});

// Login Route for Mentors
app.post('/login_mentor', async (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM mentors WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user, 'mentor');
        res.json({ message: 'Login successful', token });
    });
});

// Login Route for Investors
app.post('/login_investor', async (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM investors WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user, 'investor');
        res.json({ message: 'Login successful', token });
    });
});

// Login Route for Startups
app.post('/login_startup', async (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM startups WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user, 'startup');
        res.json({ message: 'Login successful', token });
    });
});

// Dashboards
app.get('/mentor_dashboard', (req, res) => {
    res.send('Welcome to Mentor Dashboard');
});

app.get('/investor_dashboard', (req, res) => {
    res.send('Welcome to Investor Dashboard');
});

app.get('/startup_dashboard', (req, res) => {
    res.send('Welcome to Startup Dashboard');
});

// START SERVER
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
