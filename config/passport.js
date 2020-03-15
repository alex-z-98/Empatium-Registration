const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');
const Doctor = require('../models/Doctors')

module.exports = function(passport) {
  console.log("Create Pass");
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      console.log(email);
      console.log(password);
      User.findOne({Mail: email}, function(err, user){
        if (!user) {
          console.log("Doctor");
          Doctor.findOne({Mail: email}, function(err, user){
            if (!user) {
              return done(null, false, { message: 'That email is not registered' });  
            }
            else{
              bcrypt.compare(password, user.Password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  console.log("Zaebisdoctor");
                  return done(null, user);
                } else {
                  return done(null, false, { message: 'Password incorrect' });
                }
              });
            }
          });
          //return done(null, false, { message: 'That email is not registered' });
        }
        else {
          console.log("Пароль юзера");
          bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              console.log("Zaebisclietn");
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        }
      });
      /*User.findOne({
        Mail: email
      }).then(user => {
        console.log("Клиент");
        if (!user) {
          console.log("Нету клиента");
          return done(null, false, { message: 'That email is not registered' });
        }
        else {
          console.log("Cравнить пароли");
          // Match password
          bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              console.log("Zaebisclietn");
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        }
      });
      
      console.log("Нет юзера, это Доктор");
      Doctor.findOne({
        Mail: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }
        // Match password
        bcrypt.compare(password, user.Password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            console.log("Zaebisdoctor");
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });*/
    })
  );

  passport.serializeUser(function(user, done) {
    console.log("Create Pass1");
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log("Create Pass2");
    Doctor.findById(id, function(err, user) {
      if (!user) { 
        User.findById(id, function(err, user) {
          if (!err) { 
           done(err,user);
          }
        });
      }
      else {
        done(err, user);
      }
    });
  });
};
