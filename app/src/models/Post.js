"use strict";

let mongoose = require('mongoose');

// 스키마
let postSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

// 모델, 내보내기
let Post = mongoose.model('post', postSchema);

module.exports = Post;