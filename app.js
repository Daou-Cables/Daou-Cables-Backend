const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'exp://192.168.16.101:19001/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors());

//routes

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
