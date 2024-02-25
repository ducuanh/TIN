const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        res.status(201).send({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log(process.env.SECRET);

    try {
        const users = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length) {
            const user = users[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET, { expiresIn: '1h' });
                res.status(200).send({ message: 'Logged in successfully', token });
            } else {
                res.status(401).send({ message: 'Invalid credentials' });
            }
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

