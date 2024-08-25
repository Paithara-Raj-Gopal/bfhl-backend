const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Your user details
const USER_ID = "rajgopal_paithara_09062004"; // Replace with your actual user_id
const EMAIL = "paithararajgopal@gmail.com"; // Replace with your actual email
const ROLL_NUMBER = "21BCE3562"; // Replace with your actual roll number

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            throw new Error('Invalid input: data must be an array');
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const highestLowercase = alphabets
            .filter(char => char.length === 1 && char === char.toLowerCase())
            .sort((a, b) => b.localeCompare(a))[0] || [];

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
        });
    } catch (error) {
        res.status(400).json({ is_success: false, error: error.message });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});