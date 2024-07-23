const mongoose = require('mongoose');

// MongoDB Atlas credentials
const dbUser = 'azanabid8888';
const dbPassword = '123456A';
const dbName = 'admin_qasx';
const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.pzuoddo.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Define a schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create a model
const User = mongoose.model('User', userSchema);

// Sample JSON data
const sampleData = [
  { username: 'user1@example.com', password: 'password123' },
  { username: 'user2@example.com', password: 'password456' },
  { username: 'user3@example.com', password: 'password789' },
];

// Insert sample data
User.insertMany(sampleData)
  .then(() => {
    console.log('Sample data inserted successfully');
    // Close the connection after insertion
    mongoose.connection.close();
  })
  .catch(err => console.error('Error inserting sample data:', err));
