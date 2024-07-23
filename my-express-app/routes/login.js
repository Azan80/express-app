const express = require('express');
const router = express.Router();
const User = require('/Users/a1234/Desktop/express/my-express-app/models/users.js'); 


router.post('/fetchUserData', async (req, res) => {
  const { username } = req.body;

  try {

    const userData = await User.findOne({ username });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    return res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

