"use strict";

let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

// 스키마
let userSchema = mongoose.Schema({
    email: { type: String, required: [true, '이메일을 입력해주세요.'], unique: true },
    name: { type: String, required: [true, '성함을 입력해주세요.'] },
    password: { type: String, required: [true, '비밀번호를 입력해주세요.'], select: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
}, {
    toObject: { virtuals: true },
    // MongoDB에 __v 필드가 생기지 않게
    versionKey: false,
});

// DB 저장 값 이외 필요한 항목들 (virtuals)
userSchema.virtual('passwordConfirmation')
    .get(function () { return this._passwordConfirmation; })
    .set(function (value) { this._passwordConfirmation = value; });

userSchema.virtual('originalPassword')
    .get(function () { return this._originalPassword; })
    .set(function (value) { this._originalPassword = value; });

userSchema.virtual('currentPassword')
    .get(function () { return this._currentPassword; })
    .set(function (value) { this._currentPassword = value; });

userSchema.virtual('newPassword')
    .get(function () { return this._newPassword; })
    .set(function (value) { this._newPassword = value; });

// 비밀번호 검사
userSchema.path('password').validate(function () {
    let user = this;

    // 회원가입
    if (user.isNew) {
        if (!user.passwordConfirmation) {
            user.invalidate('passwordConfirmation', 'Password Confirmation is required.');
        }

        if (user.password !== user.passwordConfirmation) {
            user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
        }
    }

    // 유저 정보 수정
    if (!user.isNew) {
        if (!user.currentPassword) {
            user.invalidate('currentPassword', 'Current Password is required!');
        }
        else if (!bcrypt.compareSync(user.currentPassword, user.originalPassword)) {
            user.invalidate('currentPassword', 'Current Password is invalid!');
        }

        if (user.newPassword !== user.passwordConfirmation) {
            user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
        }
    }
});

// 비밀번호 암호화
userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    } else {
        user.password = bcrypt.hashSync(user.password);
        return next();
    }
});

// 암호화 된 비밀번호와 비교하는 메서드
userSchema.methods.authenticate = function (password) {
    let user = this;
    return bcrypt.compareSync(password, user.password);
};

// 모델, 내보내기
let User = mongoose.model('user', userSchema);

module.exports = User;