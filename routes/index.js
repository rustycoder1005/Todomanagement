const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user,
    title: 'Your One place to manage all of your pending Tasks so you can move ahead in life without any worries. '
  })
);

//for profile
router.get('/profile',ensureAuthenticated, (req,res) =>
res.render('profile', {
  user: req.user,
  title: 'Your Profile'
})
);

//about
router.get('/about',(req,res) =>
res.render('about'));

module.exports = router;
