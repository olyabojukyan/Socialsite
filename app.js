const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()

 // mongoconnect
mongoose.connect(process.env.mongoLink, { 
  useNewUrlParser:true,
  useUnifiedTopology:true
})
const db=mongoose.connection
db.on('error', console.error.bind(console,"MongoDB connection error"))
db.on('connected',()=>{
  console.log('connected')
})
 

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
