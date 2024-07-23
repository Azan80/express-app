



const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 30019;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/admin_qasx', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');

app.use('/', indexRouter);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

