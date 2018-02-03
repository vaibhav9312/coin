
'use strict';
var ex = require('express');
var app=ex();
var http = require('http').Server(app);

var bParser = require('body-parser');

const db1=require('./app/dbconnect');
var db = db1.fdata();

var cParser = require('cookie-parser');

var session = require('client-sessions');

var handlebars = require('handlebars');

var nodemailer = require('nodemailer');

var uuid = require('uuid-v4');

var coin=require('./app');

var ObjectId = require('mongoskin').ObjectID;

app.set('port', (process.env.PORT || 3000));

app.set('view engine','ejs');
app.use(ex.static('public'));
app.enable ('view cache');

app.use(ex.static('./uploads'));

app.use(bParser.json());
app.use(bParser.urlencoded({extended:false}));

app.use(cParser());

app.use(session({
  cookieName: 'session',
  secret: 'naio1#2ospox9029(*&9{}nskjn;;',
  duration: 30*60*1000,//24 * 60 * 60 * 1000,
  //activeDuration: 5 * 60 * 1000,
   httpOnly: true,
  secure: true,
  ephemeral: true
}));


//for mailing purpose 
var readHTMLFile = function(path, callback) {
	fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
		if (err) {
			throw err;
			callback(err);
		}
		else {
			callback(null, html);
		}
	});
  };
  var transporter = nodemailer.createTransport({
	// host: '',
	// port: 465,
	// secure:true,
	service: 'gmail',
	auth: {
		user: 'rahulworks273@gmail.com',
		pass: 'rahulwork273@'
	}
  });

  app.get('/',coin.router);
app.get('/news',coin.router);
app.get('/submit',coin.router);
app.get('/admin',coin.router);
app.get('/news-admin',coin.router);
app.get('/logout',coin.router);
app.get('/adminlogout',coin.router);
app.get('/advertise',coin.router);
app.get('/login',coin.router);
app.get('/individualform',coin.router);
app.get('/newdetails',coin.router);
app.get('/register',coin.router);
app.get('/emailvari',coin.router);
app.get('/contactus',coin.router);
app.get('/indexadmin',coin.router);
app.get('/eventdetail',coin.router);
app.get('/approvelist',coin.router);

app.post('/adminlogin',coin.router);
app.post('/blogdata',coin.router);
app.post('/eventform',coin.router);
app.post('/session-access',coin.router);
app.post('/clientlogin',coin.router);
app.post('/userregister',coin.router);
app.post('/maindata',coin.router);
app.post('/approve',coin.router);


var uploadRouter = require('./app/routes/uploder')();
app.use('/file/', uploadRouter);



http.listen(app.get('port'), function(){
  console.log('listening on *:'+app.get('port'));
});
