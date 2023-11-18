const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt')
const { db, collection, getDocs, addDoc } = require('./config');


app.use(express.json());

// Allow requests from localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));


app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const usersRef = collection(db, 'users');
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
                password: hashedpassword
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
    const { password, email } = req.body;
    const usersRef = collection(db, 'users');
    let user = {};

    try {
        const snapshot = await getDocs(usersRef);
        user = snapshot.docs.find(doc => doc.data().email === email);
        if (user === undefined) {
            res.json('email not found');
        } else {
            const isMatch = await bcrypt.compare(password, user.data().password);
            if (isMatch) {
                res.json('success');
            } else {
                res.json('password incorrect');
            }
        }
    } catch (error) {
        console.log(error);
    }
});


app.listen(5000, () => console.log('listening on port 5000'))

