const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const request = require('request');
// const rp = require('request-promise');
const mongoose = require('mongoose');
// const moment = require('moment');
// const methodOverride = require('method-override');
// const expressSanitizer= require('express-sanitizer');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const passportLocalMongoose = require('passport-local-mongoose');


mongoose.connect('mongodb://localhost:27017/secret2', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(__dirname + '/themes'));
app.use(bodyParser.urlencoded({extend: true}));
// app.use(methodOverride('_method'));
// app.use(expressSanitizer());
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.render('home');
});

app.get('/secret', function(req, res){
    res.render('secret');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/register', function(req, res){
    res.render('register');
});

app.get('*', function(req, res){
    res.send('404');
});

app.listen(3093, function (err, server) {
    if(err){
        console.log(err)
    } else {
        console.log('it works')
    }
});
