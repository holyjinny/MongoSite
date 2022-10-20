"use strict";

let express = require('express');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('./src/config/passport');
let dotenv = require('dotenv');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let mongoose = require('mongoose');
let logger = require('./src/config/logger');

let app = express();

// .env
dotenv.config();

// DB 설정
mongoose.connect(process.env.MONGO_DB, {
    dbName: 'board',
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) return logger.error(`연결 실패 : ${err}`);
    logger.info(`DB가 연결되었습니다.`);
});
let db = mongoose.connection;
db.once('open', () => {
    logger.info(`${process.env.MONGO_DB}가 연결되었습니다.`);
});
db.on('error', (err) => {
    logger.error(`${process.env.MONGO_DB}가 연결 실패 : ${err}`);
});

// 기타 설정
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

// 경로
app.use('/', require('./src/routes/home'));
app.use('/', require('./src/routes/auth'));
app.use('/posts', require('./src/routes/posts'));

module.exports = app;