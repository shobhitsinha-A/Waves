const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const xss =require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');

const { handleError, convertToApiError } = require('./middleware/apiError');


/// mongodb+srv://<username>:<password>@cluster0.scuhfvx.mongodb.net/?retryWrites=true&w=majority

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// body parse 
app.use(express.json())

/// middleware sanitize 
app.use(xss())
app.use(mongoSanitize());

/// passport 
app.use(passport.initialize());
passport.use('jwt',jwtStrategy );




//routes 
app.use('/api',routes);
///localhost:3001/api/postsorusersoranythingelse

//we create middleware for error we create at the end 
// if the error is not recognised .... covert to api error 
app.use(convertToApiError);
app.use((err,req,res,next)=>{
    handleError(err,res)
})


const port = process.env.PORT || 3001

app.listen(port, ()=>{
    console.log(`Server is running in port ${port}`)
});