"use strict";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let logger = require('../config/logger');
let User = require('../models/User');

// 로그인 시 유저를 어떻게 세션에 저장할지
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// request시에 session에서 어떻게 user object를 만들것인지
passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
        done(err, user);
    });
});

// local strategy
passport.use('local-login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, (req, email, password, done) => {
        User.findOne({ email: email })
            .select({ password: 1 })
            .exec((err, user) => {
                if (err) return logger.error(`${req.method} ${err}`);
                if (user && user.authenticate(password)) {
                    return done(null, user);
                } else {
                    req.flash('email', email);
                    req.flash('errors', { login: 'ID 또는 PW가 일치하지 않습니다.' });
                    return done(null, false);
                }
            });
    })
);

module.exports = passport;