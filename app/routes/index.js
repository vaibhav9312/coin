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
  // var transporter = nodemailer.createTransport({
	// // host: '',
	// // port: 465,
	// // secure:true,
	// service: 'gmail',
	// auth: {
	// 	user: 'rahulworks273@gmail.com',
	// 	pass: 'rahulwork273@'
	// }
  // });

module.exports=() => {

  let routes={
  'get':{
    '/':(req,res)=>{
      db.collection('userevent').find({status:2}).toArray(function(err,result){
      if (!req.user&&!req.session.user) {
          res.render('index',{user:false,grade:result});
        
      }else{
        if(req.query.user){
       
          res.render('index',{user:req.query.user,grade:result});
        }else{
           res.render('index',{user:false,grade:result});
        }
      }
    });
    },
    
    '/news':(req,res) =>{
      db.collection('blog').find({}).toArray(function(err,result){

        if (!req.user&&!req.session.user) {
          res.render('news',{user:false,news:result});
          }else{
            res.render('news',{user:req.session.user.fname,news:result});
          }
      })
      },
      '/detaildata':(req,res) =>{
        if(req.query.id){
          db.collection('userevent').findOne({_id:ObjectId(req.query.id)},function(err, result){
          if(!req.user&&!req.session.user){
            res.render('eventdetail',{id:req.query.id,user:false,data:result.event});
          }else{
            res.render('eventdetail',{id:req.query.id,user:req.session.user.fname,data:result.event});
          }
        })
        }
        },

        '/admindetaildata':(req,res) =>{
          if(req.query.id){
            db.collection('userevent').findOne({_id:ObjectId(req.query.id)},function(err, result){
            if(!req.user&&!req.session.user){
              res.redirect('/login_admin');
            }else{
              res.render('eventdetail',{id:req.query.id,user:'Admin',data:result.event});
            }
          })
          }
          },

        '/adminico':(req,res)=>{
          if (!req.user&&!req.session.user) {
            res.redirect('login_admin');
          }else{
          
            res.render('adminico');
          
          }
        },
    
      '/submit':(req,res)=>{
        if (!req.user&&!req.session.user) {
          res.redirect('login');
        }else{
          if(req.query.submit){
            res.render('submit',{email:req.session.user.email,user:req.session.user.fname,submit:true});
          }else{
          res.render('submit',{email:req.session.user.email,user:req.session.user.fname,submit:false});
          }
        }
      },
        '/admin':(req,res) =>{
          if(req.query.Ainvalid){
            res.render('login_admin',{invalid:true});
          }else{
            res.render('login_admin',{invalid:false});
          }
        },
        '/news-admin':(req,res) =>{
          if (!req.user&&!req.session.user) {
            res.redirect('/admin');
        }else{
          if(req.query.save){
            res.render('news_admin',{save:true});
          }else{
            res.render('news_admin',{save:false});
          }
        }
        },

        '/indexadmin':(req,res) =>{
          if (!req.user&&!req.session.user) {
            res.redirect('/admin');
          }else{
            db.collection('userevent').find({}).toArray(function(err,result){
              res.render('index_admin',{events:result});
            });
            
          }
        },
        '/eventdetail':(req,res) =>{
          if (!req.user&&!req.session.user) {
            res.redirect('/admin');
          }else{
            db.collection('userevent').findOne({_id:ObjectId(req.query.id)},function(err,result){
            
              res.render('advancedsubmitform_admin',{single:result});
            });
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
         // if (!req.user&&!req.session.user) {
           // res.redirect('login');
            //}else{
              res.render('advertise',{user:false});
            //}
        },
        '/login':(req,res) =>{
          // if(req.user&&req.session.user){
          //   res.render('login',{user:req.session.user.fname,login:true,invalid:true,register:false});
          // }else{

            if(req.query.invalid){
             if(!req.user&&!req.session.user){
              res.render('login',{user:false,login:false,invalid:true,register:false});
              }else{res.render('login',{user:req.session.user.fname,login:true,invalid:true,register:false});}
            }
            if(req.query.register){
              if(!req.user&&!req.session.user){
                res.render('login',{user:false,login:false,invalid:false,register:true});
               }else{res.render('login',{user:req.session.user.fname,login:true,invalid:false,register:true});}
            }else{
             if(!req.user&&!req.session.user){
              res.render('login',{login:false,user:false,invalid:false,register:false});
              }else{
               
                  res.render('login',{login:true,user:req.session.user.fname,invalid:false,register:false});
                 
              }
            }

          // }






          
          
        },
        '/contactus':(req,res) =>{
          if (!req.user&&!req.session.user) {
            res.render('contactus',{user:false});
            }else{
              res.render('contactus',{user:req.session.user.fname});
            }
        },
        '/individualform':(req,res) =>{
          
          db.collection('userevent').findOne({_id:ObjectId(req.query.ind)},function (err,result){
           
          if (!req.user&&!req.session.user) {
           
            res.render('individualform',{user:false,ind:result});
          }else{
            res.render('individualform',{user:req.session.user.fname,ind:result});
          }
        });
        },

        '/approvelist':(req,res) =>{
          db.collection('userevent').find({status:2}).toArray(function(err,result){
            res.render('approvedlist',{data:result});
          });
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
              db.collection('users').update({_id:ObjectId(req.query.id)},{$set:{emailvarify:1}},function(err,result){
                res.redirect('/login');
              });
            }
          });
        }

},
  'post':{
    
      '/adminlogin':(req,res)=>{
      
        if(req.body.email=='Admin@gmail.com'&&req.body.password=="Admin"){
         
          var email= req.body.email;
          req.session.user = email;
            res.redirect('/indexadmin');
         
        }else{
          res.redirect('/admin?Ainvalid=true');
        }
      },
      '/blogdata':(req,res) =>{
        var tag=req.body.tags.split(",");
        db.collection('blog').insert({title:req.body.title,tags:tag,mdesc:req.body.mdesc,body:req.body.body,img:req.body.img,createdat:now.getTime()},function(err,result){
          res.redirect('/news-admin?save=true')
        });
      },
      '/edeteil':(req,res) =>{
       
        db.collection('userevent').update({_id:ObjectId(req.body.id)},{$set:{detail:req.body.detail}},function(err,result){
          if(req.session.user=='Admin@gmail.com'){
            res.redirect('/eventdetail?id='+req.body.id);
          }else{
            res.redirect('/');
          }
          
        });
      },
      

      '/approve':(req,res) =>{
        db.collection('userevent').update({_id:ObjectId(req.body.id)},{$set:{status:2,grade:req.body.grade}},function(err,result){
          res.redirect('/approvelist')
        });
      },
      '/eventform':(req,res) =>{
        if (!req.user&&!req.session.user) {
          res.redirect('login');
      }else{
          if(req.query.submit){
            res.render('advancesubmit',{name:req.body.name,email:req.body.email,event:req.body.event,user:req.session.user.fname,id:result.ops[0]._id,submit:true});
          }else{

        db.collection('userevent').insert({name:req.body.name,email:req.body.email,event:req.body.event,proinfo:req.body.aboutpro,crowdfund:req.body.crwfmember,status:0},function(err,result){
          res.render('advancesubmit',{name:req.body.name,email:req.body.email,event:req.body.event,user:req.session.user.fname,id:result.ops[0]._id,submit:false});
        });
      }
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
      '/check-mail':(req,res)=>{
       
        db.collection('users').findOne({email:req.query.email},function(err,result){
          if(err)throw err;
          
          res.send(result);
        });
      },
      '/userregister':(req, res)=>{
        
        var code=uuid();
        db.collection('users').insert({fname:req.body.fname,lname:req.body.lname,mobile:req.body.mobile,email:req.body.email,password:req.body.password,emailvarify:0,varificationcode:code},function(err,result){
          res.redirect('/login?register=true');
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
             host:'smtp.zoho.com',
  port:465,
  secure:true,
             auth: {
 user: 'vaibhav@squarepixelstudios.net',
     pass: 'qwerty123'
             }
             });
             
             var mailOptions = {
             from: 'CoinContents Team<vaibhav@squarepixelstudios.net>',
             to: req.body.email,
             subject: 'Email Verification',
             html:'<H3>Hello:"'+req.body.fname+'"</H3><br><p>This mail for Email Verification for your Account('+req.body.email+') in CoinContents.</p><p>Kindly Click on The link For Verification</p><br><a href="http://coincontents.herokuapp.com/emailvari?code='+code+"&id="+result.ops[0]._id+'">click here fo verification</a>"' 
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
      //console.log(req.body);
      // var st= req.body.startdate.split('/');
      // var et= req.body.enddate.split('/');
      //   var d = new Date(st[0]+'/'+(st[1]+1)+'/'+st[2]);
      //   var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      //  var nd = new Date(utc + (3600000*0));
      //  var dat= nd.getTime();

      //  var d1 = new Date(et[0]+'/'+(et[1]+1)+'/'+et[2]);
      //  var utc1 = d1.getTime() + (d1.getTimezoneOffset() * 60000);
      //  var nd1 = new Date(utc1 + (3600000*0));
      //  var dat1=nd1.getTime();

      var team=JSON.parse(req.body.members);
      
      db.collection('userevent').update({_id:ObjectId(req.body.id)},{$set:{pro_website:req.body.project_website,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        project_category:req.body.pcategory,
        tba:req.body.tba,
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
        status:1,
        platform:req.body.platform,
        team:team}},function(err,result){
         res.redirect('/detaildata?id='+req.body.id);
        });

    },

    '/adminmaindata':(req, res)=>{
      
      var team=JSON.parse(req.body.members);
      db.collection('userevent').insert({pro_website:req.body.project_website,
        name:req.body.name,
        event:req.body.event,
        email:req.body.email,
        proinfo:req.body.aboutpro,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
        project_category:req.body.pcategory,
        tba:req.body.tba,
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
        status:1,
        platform:req.body.platform,
        team:team},function(err,result){
          
         res.redirect('/admindetaildata?id='+result.ops[0]._id);
        });

    }
      
  }
}
  
  return h.route(routes);
}


