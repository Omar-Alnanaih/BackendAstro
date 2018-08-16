const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
// const hotels =require("./routes/hotels")
const cors = require('cors')
const passport = require('passport');
const app = express()

// Body parser middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);


// // DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
.connect(db,{ useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get('/', (req,res) => res.json({msg:"hello my name is"}));
app.get('/about', (req,res) => res.send("Our company was founded in 2015"));
app.use('/users', users);
// app.use('/Hotel', Hotel)

app.get('/dashboard', passport.authenticate('jwt', {session:false}),(req,res) => {
  return res.json({
    data: [
      {
        "Name": "John Doe",
        "Subject enroled in": "Math: Calculus 1",
        "Country": "UAE"
      }
    ]
  })
})



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
