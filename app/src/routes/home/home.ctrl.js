"use strict";

let logger = require('../../config/logger');

const output = {
    home: (req, res) => {
        logger.info(`${req.method} ${req.path} => 홈 화면으로 이동`);
        res.render('home/welcome');
    },
    about: (req, res) => {
        logger.info(`${req.method} ${req.path} => 정보 화면으로 이동`);
        res.render('home/about');
    },
    login: (req, res) => {
        logger.info(`${req.method} ${req.path} => 로그인 화면으로 이동`);
        let email = req.flash('email')[0];
        let errors = req.flash('errors')[0] || {};
        res.render('home/login', {
            email: email,
            errors: errors,
        });
    },
    register: (req, res) => {
        logger.info(`${req.method} ${req.path} => 회원가입 화면으로 이동`);
        res.render('home/register');
    },
    emailAgree: (req, res) => {
        logger.info(`${req.method} ${req.path} => 이메일 가입 동의 화면으로 이동`);
        res.render('home/email/agree');
    },
};

module.exports = { output };