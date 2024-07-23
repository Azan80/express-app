const mongoose = require('mongoose');


mongoose.connect('mongodb://0.0.0.0:27017/admin_qasx', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// MongoDB Atlas credentials
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Define a User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Create a User model
const User = mongoose.model('User', userSchema);

// Function to save a user to the database
const saveUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    console.log('User saved successfully');
  } catch (err) {
    console.error('Error saving user data to MongoDB:', err);
  } finally {
    mongoose.connection.close(); // Close the connection after operation
  }
};

// Test the saveUser function
const testUser = {
  username: 'testuser',
  password: 'testpassword'
};

saveUser(testUser);
