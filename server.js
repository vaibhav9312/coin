'use strict';
var ex = require('express');
var app=ex();
var http = require('http').Server(app);

var bParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.set('view engine','ejs');
app.use(ex.static('public'));
   



app.use(bParser.json());
app.use(bParser.urlencoded({extended:false}));

app.get('/',function(req,res){
 res.render('index');
	});
app.get('/news',function(req,res){
	res.render('news');
});
app.get('/advertise',function(req,res){
	res.render('advertise');
});
app.get('/login',function(req,res){
	res.render('login');
});
app.get('/contactus',function(req,res){
	res.render('contactus');
});
app.get('/individualform',function(req,res){
	res.render('individualform');
});
app.get('/newdetails',function(req,res){
	res.render('newdetails');
});

http.listen(app.get('port'), function(){
  console.log('listening on *:'+app.get('port'));
});
