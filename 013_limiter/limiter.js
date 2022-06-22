const express = require('express');
const limiter = require('express-rate-limit');

const app = express();

// To use rate limiter globally
// app.use(limiter({
//     windowMs: 5000,
//     max: 5,
//     message: {
//         code: 429,
//         message: 'Too many attempts'
//     }
// }))


app.get('/', (req, res) => res.send('Hello from rate limited app'))


app.get('/open', (req, res) => res.send('This is an open end point'))

const loginLimiter = limiter({
    windowMs: 5000,
    max: 5,
    message: {
        code: 429,
        message: 'Too many attempts'
    }
})

app.get('/login', (req, res) => res.send('Login with get'))
app.post('/login', loginLimiter, (req, res) => res.send('Login with post'))


app.listen(3000, (req, res) => console.log("Server running on port 3000"))