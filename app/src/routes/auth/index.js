"use strict";

let express = require('express');
let router = express.Router();
let passport = require('../../config/passport');
let ctrl = require('./auth.ctrl');

// 회원가입
router.post('/auth/register', ctrl.process.register);

// 로그인
router.post('/auth/login', ctrl.process.login,
    passport.authenticate('local-login', {
        successRedirect: '/posts',
        failureRedirect: '/login'
    })
);

// 로그아웃
router.get('/logout', ctrl.process.logOut);


module.exports = router;