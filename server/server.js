const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const { db, getDocs, addDoc, usersRef, updateDoc, moviesRef, Timestamp } = require('./config');
// const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./GoogleAuthSetUp')
require('./FacebookAuthSetUp');
require('dotenv').config();
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');


app.use(express.json());

// Allow requests from localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(passport.initialize());
app.use('/auth', authRoute);
app.use('/profile', profileRoute);

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return null;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.json('token expired');
        }
        req.user = user;
        next();
    })
}

app.get('/token', authenticateToken, (req, res) => {
    const name = req.user.name;
    const email = req.user.email;
    res.json({
        name: name,
        email: email
    });
})

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(password);
    // const usersRef = collection(db, 'users');
    const time = Timestamp.now().toDate();
    const readableDate = time.getFullYear() + '-'
        + ('0' + (time.getMonth() + 1)).slice(-2) + '-'
        + ('0' + time.getDate()).slice(-2)
    try {
        const snapshot = await getDocs(usersRef);
        const emailFound = snapshot.docs.some(doc => doc.data().email === email);
        let newUser;
        if (emailFound) {
            res.json('email already exists')
            return;
        }
        else if (password === undefined) {
            newUser = {
                name,
                email,
                gender: '',
                dateOfBirth: '',
                country: '',
                profile_pic: '',
                createdAt: readableDate
            }
        }
        else {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedpassword = await bcrypt.hash(password, salt)
            newUser = {
                name,
                email,
                password: hashedpassword,
                gender: '',
                dateOfBirth: '',
                country: '',
                profile_pic: '',
                createdAt: readableDate
            }
        }
        addDoc(usersRef, newUser)
        res.json('user created')
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Server Error');
    }
})


app.post('/signin', async (req, res) => {
    const { password, email, rememberMe } = req.body;
    // const usersRef = collection(db, 'users');
    let user = {};

    try {
        const snapshot = await getDocs(usersRef);
        user = snapshot.docs.find(doc => doc.data().email === email);
        if (user === undefined) {
            res.json('email not found');
        } else {
            const isMatch = await bcrypt.compare(password, user.data().password);
            if (isMatch) {
                const userPayload = {
                    name: user.data().name,
                    email: user.data().email
                }
                const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: rememberMe ? '7d' : '1h' })
                res.json({ userPayload, accessToken })
            } else {
                res.json('password incorrect');
            }
        }
    } catch (error) {
        console.log(error);
    }
});

app.get('/movies', async (req, res) => {
    try {
        const snapshot = await getDocs(moviesRef);
        const movies = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()

        }));
        // console.log(movies);
        res.json(movies.slice(-5)); // Return last 5 movies
    }
    catch (err) {
        res.status(500).send('error')
        console.error('Error updating document', error);
    }
})



app.listen(5000, () => console.log('listening on port 5000'))

