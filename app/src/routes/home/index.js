"use strict";

let express = require('express');
let router = express.Router();
let ctrl = require('./home.ctrl');

// Home
router.get('/', ctrl.output.home);
router.get('/about', ctrl.output.about);

// 로그인 페이지
router.get('/login', ctrl.output.login);

// 회원가입 페이지
router.get('/register', ctrl.output.register);

module.exports = router;