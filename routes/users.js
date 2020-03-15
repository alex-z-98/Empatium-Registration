const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const Doctor = require('../models/Doctors');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));
//doctor.html
router.get('/doctorregisterwix', (req, res) => res.sendFile(__dirname + '/psycho.html'));
router.post('/doctorregisterwix', (req, res) =>{
  console.log(req.body);
  const {Name , Mail, Telephone, PsychGender, PsychAge, Education, Specialization, Exp, Region, Schedule, Cost, Time, Pref, Password, Password2} = req.body;
  let errors = [];
  Doctor.findOne({ Mail: Mail }).then(doctor => {
    if (doctor) {
      errors.push({ msg: 'Email already exists' });
      res.sendFile(__dirname + '/psycho.html');
    } else {
      const newDoctor = new Doctor({
        Name , Mail, Telephone, PsychGender, 
        PsychAge, Education, Specialization, 
        Exp, Region, Schedule, Cost, Time, 
        Pref, Password
      });
      console.log(newDoctor);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newDoctor.Password, salt, (err, hash) => {
          if (err) throw err;
          newDoctor.Password = hash;
          newDoctor
            .save()
            .then(doctor => {
              req.flash(
                'success_msg',
                'You are now registered and can log in'
              );
              res.redirect('/users/login');
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});
//client.html
router.get('/clientregisterwix', (req, res) => res.sendFile(__dirname + '/client.html'));
router.post('/clientregisterwix', (req, res) => {
  const {...data} = req.body;
  console.log(req.body);
  //const { Name, Email, Password, Password2 } = req.body;
  const {Name , Mail, Password, Password2, Telephone, PatientGender, Region, PatientAge, Money, Shedule, Time, PrimaryProblem, PsychGender, Other, PsychAge} = req.body;
  let errors = [];
  User.findOne({ Mail: Mail }).then(user => {
    if (user) {
      errors.push({ msg: 'Email already exists' });
      res.sendFile(__dirname + '/client.html');
    } else {
      const newUser = new User({
        Name , Mail, Password, Telephone, 
        PatientGender, Region, PatientAge, 
        Money, Shedule, Time, PrimaryProblem, 
        PsychGender, Other, PsychAge
      });
      console.log(newUser);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.Password, salt, (err, hash) => {
          if (err) throw err;
          newUser.Password = hash;
          newUser
            .save()
            .then(user => {
              req.flash(
                'success_msg',
                'You are now registered and can log in'
              );
              res.redirect('/users/login');
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// Register
router.post('/register', (req, res) => {
  console.log(req.body);
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  console.log("Login");
  console.log(req.body);
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
