const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');
// import app from app.js
const app = require('./app');
const port = process.env.PORT || 5000;


//DB CONNECTION
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log(`Database connection is successful`.red.bold)
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
