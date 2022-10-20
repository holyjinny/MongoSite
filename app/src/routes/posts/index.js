"use strict";

let express = require('express');
let router = express.Router();
let ctrl = require('./posts.ctrl');

// 순서
router.get('/', ctrl.process.index);

// 게시글 등록 페이지
router.get('/new', ctrl.process.new);

// 상세 게시글 화면
router.get('/:id', ctrl.process.detail);

// 게시글 수정 화면
router.get('/:id/edit', ctrl.process.edit);

// 게시글 등록
router.post('/', ctrl.process.create);

// 게시글 수정
router.put('/:id', ctrl.process.update);

// 게시글 삭제
router.delete('/:id', ctrl.process.delete);

module.exports = router;