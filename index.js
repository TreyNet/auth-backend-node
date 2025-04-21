require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const users = [
    { id: 1, username: 'administrator', password: '@min01!', role: 'Administrator' },
];

// Login -> returns a token
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) return res.status(401).json({ error: 'Wrong credentials' });

    const token = jwt.sign(
        {
            id: user.id, username: user.username, role: user.role
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '15m' }
    );

    res.json({token});
});

// Authentication Middleware
function authMiddleware(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if(error) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Protected route
app.get('/profile', authMiddleware, (req, res) => {
    res.json({
        message: 'Access granted',
        user: req.user
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

