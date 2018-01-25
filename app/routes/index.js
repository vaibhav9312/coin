'use strict';
const h=require('../helpers');

var dateFormat = require('dateformat');
    var now = new Date();

const db1=require('../dbconnect');
var db = db1.fdata();

var session = require('client-sessions');

var handlebars = require('handlebars');

var nodemailer = require('nodemailer');

var uuid = require('uuid-v4');

var ObjectId = require('mongoskin').ObjectID;

 
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

module.exports=() => {

  let routes={
  'get':{
    '/':(req,res)=>{
      if (!req.user&&!req.session.user) {
        if(req.query.user){
          res.render('index',{user:false});
        }else{
           res.render('index',{user:false});
        }
      }else{
        
        if(req.query.user){
        
          res.render('index',{user:req.query.user.fname});
        }else{
           res.render('index',{user:req.query.user.fname});
        }
      }
    },
    
    '/news':(req,res) =>{
      db.collection('blog').find({}).toArray(function(err,result){

        if (!req.user&&!req.session.user) {
          res.render('news',{user:false,news:result});
          }else{
            res.render('news',{user:true,news:result});
          }
      })
      },
    
      '/submit':(req,res)=>{
        if (!req.user&&!req.session.user) {
          res.redirect('login');
        }else{
          
          res.render('submit',{email:req.session.user.email,user:req.session.user.fname});
        }
      },
        '/admin':(req,res) =>{
          if(req.query.invalid){
            res.render('login_admin',{invalid:true});
          }else{
            res.render('login_admin',{invalid:false});
          }
        },
        '/news-admin':(req,res) =>{
          if (req.user&&req.session.user) {
          if(req.query.save){
            res.render('news_admin',{save:true});
          }else{
            res.render('news_admin',{save:false});
          }
        }else{
          res.redirect('/admin');
        }
        },

        
        
        '/logout':(req,res) =>{
          req.session.reset();
	        res.redirect('/');
        },
        '/adminlogout':(req,res) =>{
          req.session.reset();
        	res.redirect('/admin');
        },
        '/advertise':(req,res) =>{
          if (!req.user&&!req.session.user) {
            res.redirect('login');
            }else{
              res.render('advertise',{email:req.session.user.email,user:req.session.user.fname});
            }
        },
        '/login':(req,res) =>{
          if(req.query.invalid){
            if(!req.user&&!req.session.user){
            res.render('login',{user:false,login:false});
            }else{res.render('login',{user:req.session.user,login:true});}
          }else{
            if(!req.user&&!req.session.user){
            res.render('login',{login:false,user:false});
            }else{
              res.render('login',{login:true,user:req.session.user});
            }
          }
        },
        '/contactus':(req,res) =>{
          if (!req.user&&!req.session.user) {
            res.redirect('login');
            }else{
              res.render('contactus',{user:req.session.user.fname});
            }
        },
        '/individualform':(req,res) =>{
          res.render('individualform');
        },
        '/newdetails':(req,res) =>{
          db.collection('blog').findOne({_id:ObjectId(req.query.id)},function(err,result){

          
          if (!req.user&&!req.session.user) {
          res.render('newdetails',{user:false,data:result});
          }else{
            res.render('newdetails',{user:req.session.user.fname,data:result});
          }
        })
        },
        '/register':(req,res) =>{
          res.render('registration');
        },
        '/emailvari':(req,res) =>{
          db.collection('users').findOne({_id:ObjectId(req.query.id)},function(err,result){
	
            if(req.query.code==result.varificationcode){
              db.collection('users').update({_id:ObjectId(req.query.id)},{emailvarify:1},function(err,result){
                res.redirect('/login');
              });
            }
          });
        }

},
  'post':{
    
      '/adminlogin':(req,res)=>{
      
        if(req.body.email=='Admin'&&req.body.password=="Admin"){
          res.render('index_admin');
          req.session.user = req.body.email;
        }else{
          res.redirect('/admin?invalid=true');
        }
      },
      '/blogdata':(req,res) =>{
        var tag=req.body.tags.split(",");
        db.collection('blog').insert({title:req.body.title,tags:tag,mdesc:req.body.mdesc,body:req.body.body,img:req.body.img,createdat:now.getTime()},function(err,result){
          res.redirect('/news-admin?save=true')
        });
      },
      '/eventform':(req,res) =>{
        if (!req.user&&!req.session.user) {
          res.redirect('login');
      }else{
      
        db.collection('userevent').insert({name:req.body.name,email:req.body.email,event:req.body.event,proinfo:req.body.aboutpro,crowdfund:req.body.crwfmember},function(err,result){
          res.render('advancesubmit',{name:req.body.name,email:req.body.email,event:req.body.event,user:req.session.user.fname,id:result.ops[0]._id});
        });
      }
      },

      '/session-access':(req,res) =>{
        db.collection('users').findOne({email:req.body.email,password:req.body.password},function(err,result){
		 
          if(result){
     
           if(result.emailvarify==1){
     
             //req.session.email = req.body.email;
             req.session.user = result;
             res.redirect('/?user='+result.fname);
     
           }else{
     
             res.redirect('/login?invalid=true')
             }
          }else{
           
            res.redirect('/login?invalid=true')
          }
        });
      },
      '/clientlogin':(req, res)=>{
          db.collection('users').findOne({email:req.body.email,password:req.body.password},function(err,result){
            res.redirect('/login');
          });
      },
      '/userregister':(req, res)=>{
        
        var code=uuid();
        db.collection('users').insert({fname:req.body.fname,lname:req.body.lname,mobile:req.body.mobile,email:req.body.email,password:req.body.password,emailvarify:0,varificationcode:code},function(err,result){
          res.redirect('/login');
         //console.log(result);
         
     
       // 	 var pat=path.resolve(__dirname, '..','email/plancancel.html');
       // 	 readHTMLFile(pat, function(err, html) {
       // 	 var template = handlebars.compile(html);
       // 	 var replacements = {
       // 	   name: ret.businessname,
       // 	   planname: result.planname,
       // 	   sdate:stat,
       // 	   edate:Endt,
       // 	   dur:result.duration
       // 	 };
       // 	 var htmlToSend = template(replacements);
       //  var mailOptions = {
       // 	 from: '"Seoz Team"<hello@seoz.com.au>',
       // 	 to: ret.Pemail, // list of receivers (who receives)
       // 	 subject: 'Welcome To Seoz.', // Subject line
       // 	 html:htmlToSend
       //  };
       //  transporter.sendMail(mailOptions, (error, info) => {
       // 	 if (error) {
       // 		 return console.log(error);
       // 	 }
       // 	 // console.log('Message %s sent: %s', info.messageId, info.response);
       // 	 // console.log(info.accepted+'/'+info.rejected+':'+info.pending);
       //    });
       // 	 });
     
     
             //    // sending mail for admin 
           //    var mailOptions = {
           // 	from: 'rahulworks273@gmail.com',
           // 	to: req.body.email,
           // 	subject: 'From bit.fake bit coin',
           // 	html:'<H3>hello:"'+req.body.name+'"</H3><br><p>Go To Given link For Varification</p><br><a href="localhost:3000/emailvari?code='+uuid+"&id="+result.ops[0]._id+'">click here fo varification</a>"' 
           //   };
           //   transporter.sendMail(mailOptions, function(error, info){
           // 	if (error) {
           // 	  console.log(error);
           // 	} else {
           // 	  console.log('Email sent: ' + info.response);
           // 	}
           //   });
     
     
             var transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
               user: 'rahulworks273@gmail.com',
               pass: 'rahulwork273@'
             }
             });
             
             var mailOptions = {
             from: 'rahulworks273@gmail.com',
             to: req.body.email,
             subject: 'Sending Email using Node.js',
             html:'<H3>hello:"'+req.body.name+'"</H3><br><p>Go To Given link For Varification</p><br><a href="http://192.168.100:3000/emailvari?code='+code+"&id="+result.ops[0]._id+'">click here fo varification</a>"' 
             };
             
             transporter.sendMail(mailOptions, function(error, info){
             if (error) {
               console.log(error);
             } else {
               console.log('Email sent: ' + info.response);
             }
             });
     
        });
    },
    '/maindata':(req, res)=>{
      db.collection('userevent').update({_id:ObjectId(req.body.id)},{$set:{pro_website:req.body.project_website,
        startdate:req.body.startdate,
        enddte:req.body.enddate,
        project_category:req.body.pcategory,
        project_type:req.body.ptype,
        coinname:req.body.coinname,
        symbol:req.body.symbol,
        totalsupply:req.body.tsupply,
        whitepapper:req.body.whitepaper,
        twiter:req.body.twiter,
        reddit:req.body.reddit,
        slack:req.body.slack,
        btcannounce:req.body.btcannounce,
        logoimg:req.body.logopic,
        team:[]}},function(err,result){
          for(var i=0;i<req.body.mcount;i++){
            var name=req.body.fullname+i;
            var picture=req.body.picture+i;
            var position=req.body.position+i;
            var shortbio=req.body.shortbio+i;
            var linkdin=req.body.linkdin+i;
            var passport=req.body.passport+i;
            db.collection('userevent').update({_id:ObjectId(req.body.id)},{$push:{team:{fullname:name,picture:picture,position:position,shortbio:shortbio,linkdin:linkdin}}},function(err,result1){
              console.log("success");
            })
          }
        });
    
    }
      
  }
}
  
  return h.route(routes);
}


