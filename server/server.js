const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const { db, getDocs, addDoc, usersRef, updateDoc, moviesRef } = require('./config');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();


app.use(express.json());

// Allow requests from localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));


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
    // const usersRef = collection(db, 'users');
    try {
        const snapshot = await getDocs(usersRef);
        const emailFound = snapshot.docs.some(doc => doc.data().email === email);
        if (emailFound) {
            res.json('email already exists')
        }
        else {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedpassword = await bcrypt.hash(password, salt)
            const newUser = {
                name,
                email,
                password: hashedpassword,
                gender: '',
                dateOfBirth: '',
                country: '',
                // createdAt: admin.firestore.FieldValue.serverTimestamp()
            }
            addDoc(usersRef, newUser)
            res.json('user created')
        }
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
                // res.send({
                //     name: user.data().name,
                //     email: user.data().email
                // })
            } else {
                res.json('password incorrect');
            }
        }
    } catch (error) {
        console.log(error);
    }
});

app.post('/profile', async (req, res) => {
    const { email } = req.body;
    try {
        // const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const user = snapshot.docs.find(doc => doc.data().email === email);
        if (user !== undefined) {
            res.json(user.data());
            return;
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Error');
    }
});

app.put('/profile', authenticateToken, async (req, res) => {
    const { gender, dateOfBirth, country, email, dateJoined } = req.body;
    console.log(gender);
    try {
        const updatedUser = {
            gender,
            dateOfBirth,
            country,
            // dateJoined,
        }
        const snapshot = await getDocs(usersRef);
        const user = snapshot.docs.find(doc => doc.data().email === email);
        await updateDoc(user.ref, updatedUser);
        console.log('User profile updated successfully');
        res.json('saved');
    }
    catch (error) {
        res.status(500).send('error');
        console.error('Error updating document', error);
    }
})

app.get('/movies', async (req, res) => {
    try {
        const snapshot = await getDocs(moviesRef);
        const movies = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()

        }));
        console.log(movies);
        const notComingSoonMovies = movies.filter(movie => movie.status !== 'coming soon');
        res.json(notComingSoonMovies.slice(-5)); // Return last 5 movies
    }
    catch (err) {
        res.status(500).send('error')
        console.error('Error updating document', error);
    }
})

app.get('/comingsoon', async (req, res) => {
    try {
        const snapshot = await getDocs(moviesRef);
        const movies = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        const commingsoon = movies.filter((movie) => movie.status === 'coming soon');
        res.json(commingsoon);
    }
    catch (err) {
        res.status(500).send('error');
        console.error('Error fetching coming soon movies', err);
    }
});


app.get('/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const docRef = doc(moviesRef, movieId); 
        const docSnap = await getDocs(docRef);

        if (docSnap.exists()) {
            res.json(docSnap.data()); 
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error('Error fetching movie details', error);
    }
});


app.listen(5000, () => console.log('listening on port 5000'))

