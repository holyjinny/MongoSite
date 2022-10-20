"use strict";

let logger = require('../../config/logger');
let User = require('../../models/User');

const process = {
    register: (req, res) => {
        logger.info("회원가입 진행");
        User.create(req.body, (err, user) => {
            if (err) return logger.error(`${req.method} ${err}`);
            res.redirect('/login');
        });
    },
    login: (req, res, next) => {
        logger.info("로그인 진행");
        let errors = {};
        let isVaild = true;

        if (!req.body.email) {
            isVaild = false;
            errors.email = "이메일을 입력해주세요";
        }

        if (!req.body.password) {
            isVaild = false;
            errors.password = "비밀번호를 입력해주세요";
        }

        if (isVaild) {
            next();
        } else {
            req.flash('errors', errors);
            res.redirect('/login');
        }
    },
    logOut: (req, res, next) => {
        req.logout((err) => {
            if (err) return logger.error(`${req.method} ${err}`);
            res.redirect('/');
        });
    },
};

module.exports = { process };