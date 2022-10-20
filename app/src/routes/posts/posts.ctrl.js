"use strict";

let logger = require('../../config/logger');
let Post = require('../../models/Post');

const process = {
    index: (req, res) => {
        Post.find({})
            .sort('-createdAt')
            .exec((err, posts) => {
                if (err) return logger.error(`${req.method} ${err}`);
                res.render('posts/index', { posts: posts });
            });
    },
    new: (req, res) => {
        logger.info(`${req.method} ${req.path} => 게시글 등록 화면으로 이동`);
        res.render('posts/new');
    },
    detail: (req, res) => {
        Post.findOne({ _id: req.params.id }, (err, post) => {
            if (err) return logger.error(`${req.method} ${err}`);
            res.render('posts/show', { post: post });
        });
    },
    edit: (req, res) => {
        Post.findOne({ _id: req.params.id }, (err, post) => {
            if (err) return logger.error(`${req.method} ${err}`);
            res.render('posts/edit', { post: post });
        });
    },
    create: (req, res) => {
        Post.create(req.body, (err, post) => {
            if (err) return logger.error(`${req.method} ${err}`);
            res.redirect('/posts');
        });
    },
    update: (req, res) => {
        req.body.updatedAt = Date.now();
        Post.findOneAndUpdate({ _id: req.params.id }, req.body, (err, post) => {
            if (err) return logger.error(`${req.method} ${err}`);
            res.redirect("/posts/" + req.params.id);
        });
    },
    delete: (req, res) => {
        Post.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return logger.error(`${req.method} ${err}`);
            res.redirect('/posts');
        })
    },
};

module.exports = { process };