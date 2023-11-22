const router = require('express').Router();
const { db, getDocs, addDoc, usersRef, updateDoc, moviesRef } = require('../config');
const jwt = require('jsonwebtoken');

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

router.post('/', async (req, res) => {
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

router.put('/', authenticateToken, async (req, res) => {
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

module.exports = router;