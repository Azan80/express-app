require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('/Users/a1234/Desktop/express/my-express-app/models/users.js');
const path = require('path');
const jwt = require('jsonwebtoken');
const { localsName } = require('ejs');
const cookieParser = require('cookie-parser');

const secretkey = "#9ypp8qv9c"
router.use(express.json())
router.use(cookieParser());

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

router.get('/loginn', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/loginPage.html'));
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try { 
    const user = await User.findOne({ username });
    console.log("user",user)

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
   


    const token = jwt.sign({ username }, secretkey, { expiresIn: '300s' }); 
    console.log('Token generated:', token);
 
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.send('login success');

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  
  }
});

router.post('/signup', async (req, res) => {
  console.log('Received form data:', req.body);

  const userData = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name
  };

  try {
    const token = jwt.sign({ userData }, secretkey, { expiresIn: '300s' });
    console.log(token);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    const user = new User(userData);
    await user.save();
    console.log('User saved successfully');
    res.json({ message: 'User saved successfully', token });

  } catch (err) {
    console.error('Error saving user data to MongoDB:', err);
    res.status(500).send('Error saving user data to MongoDB');
  }
});



router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).send('Error fetching user by ID');
  }
});


router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching all users:', err);
    res.status(500).send('Error fetching all users');
  }
});


router.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send(err.message);
  }
});


router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(`User with ID ${req.params.id} deleted successfully`);
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send(err.message);
  }
});




module.exports = router;



