const dotenv = require("dotenv")
dotenv.config();

const express = require("express");
const connectDB = require("./config/connectDB");
const morgan = require('morgan');

const app = express();


const HOST = process.env.HOST;
const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

// routes
const productRoutes = require('./routes/productRoutes.js');

// DB connection
connectDB(MONGO_URL);

app.use(morgan('dev'));

// load routes
app.use('/', productRoutes);

app.get('/', (req, res) => {
  res.send("Home Page");
})

app.listen(PORT, HOST, () => {
  console.log(`server listening at http://${HOST}:${PORT}...`)
})