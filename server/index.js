const express = require("express");
require("dotenv/config");
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
const StoredetailRouter = require('./Routes/StoredetailRouter.js');
const StoreThemeRouter = require('./Routes/StoreThemeRouter.js');
const cors = require('cors');

const PORT = process.env.PORT || 6700;
const app = express();
const mongoose = require("mongoose");

const corsOptions = {
  origin: '*', // Replace with your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};
 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));
 
app.use('/api', StoreThemeRouter);
app.use('/api', StoredetailRouter);

mongoose.set("strictQuery", true);

try {

  mongoose.connect('mongodb://127.0.0.1:27017', {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  });

  console.log("DB Connected")
 } catch (err) {
  console.log("Mongodb Error")
  console.log(err)
 }


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


// var corsOptions = {
//   origin: '*',
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

