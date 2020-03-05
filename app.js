const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('./models/user');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');


// const request = require('request');
// const rp = require('request-promise');
// const moment = require('moment');
// const methodOverride = require('method-override');
// const expressSanitizer= require('express-sanitizer');

mongoose.connect('mongodb://localhost:27017/secret2', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(require('express-session')({
    secret: 'koji sam ja meni kralj',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(__dirname + '/themes'));
// app.use(bodyParser.urlencoded({extend: true}));
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
// app.use(expressSanitizer());
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=================
// ROUTES
//================

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/secret', isLoggedIn, function (req, res) {
    res.render('secret');
});

//=================
// AUTH ROUTES
//=================

app.get('/register', function (req, res) {
    res.render('register');
});

app.post('/register', function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        } else {
            // res.redirect('/');
            passport.authenticate('local')(req, res, function () {
                res.redirect('/secret')
            })
        }
    });
});


app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), function (req, res) {
    // res.send('login post routh')
});

app.get('/logout', function (req, res) {
    // res.send('ok, i will log you out. not yet though...')
    req.logout();
    res.redirect('/')
});

//=================
// 404 ROUTE
//===============

app.get('*', function (req, res) {
    res.send('404');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login')
}

app.listen(3093, function (err, server) {
    if (err) {
        console.log(err)
    } else {
        console.log('server is working')
    }
});
