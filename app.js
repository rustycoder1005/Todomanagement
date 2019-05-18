const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
//const mongoose2=require('mongoose')
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var path = require('path');

var app = express();

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose.Promise = global.Promise;
//mongoose2.Promise= global.Promise;

//for connecting todo database
/* mongoose2.connect('mongodb://localhost/todo')
  .then(() =>  console.log('db connected'))
  .catch((err) => console.error(err));
*/
  //for connecting adminstrator
mongoose.connect('mongodb://localhost/todoapp')
.then(() => console.log('connected with the mongodb database'));


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//join static folder path for css
app.use(express.static(path.join(__dirname, 'public')));


// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/todo', require('./routes/todo.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
