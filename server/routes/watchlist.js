const router = require('express').Router();
const { db, getDocs, addDoc, usersRef, updateDoc, moviesRef, Timestamp, doc, getDoc, reviewRef } = require('../config');
const { ref, uploadBytes, getDownloadURL } = require('@firebase/storage');
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


router.get('/', authenticateToken, async (req, res) => {
    const { email } = req.user;
    try {
        const userSnapshot = await getDocs(usersRef);
        const user = userSnapshot.docs.find(doc => doc.data().email === email);
        const watchlist = user.data().watchlist;
        res.json(watchlist);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/additem', authenticateToken, async (req, res) => {
    const { id } = req.body;
    const { email } = req.user;
    console.log(email);
    console.log(id);
    try {
        const docRef = doc(moviesRef, id);
        const movie = await getDoc(docRef);
        if (!movie.exists()) {
            return res.status(404).json({ message: "Movie not found" });
        }
        const userSnap = await getDocs(usersRef);
        const user = userSnap.docs.find((doc) => doc.data().email === email)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user.data())
        user.data().watchlist.push(movie.data());
        res.json({ data: user.data().watchlist, message: 'success' });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred" });
    }
})

module.exports = router;


