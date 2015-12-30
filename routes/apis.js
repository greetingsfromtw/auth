require('../lib/db');

var express = require('express'),
	mongoose = require('mongoose');

var router = express.Router();

var Users = mongoose.model('Users');


//使用者註冊功能
router.post('/register', function(req, res, next) {
  var getname = req.body.username;
  var getpwd = req.body.password;
  Users.findOne({
    username: getname,
  }, function(err, existUser) {
    if (err) throw err;
    if (getname === '') { 
            res.render('users/register',{
        namealert:'username blank'
      });
    } 
    else if(existUser){
      // duplicate user
      res.render('users/register',{
        namealert:'user exist'
      });

    }else if((getpwd ==='') ||(getpwd.length < 3)){
        res.render('users/register',{
          pwdalert:'Please type password more than 3 characters'
        })
    }else {
      // create new user
      Users.create({
        username: req.body.username,
        password: req.body.password,
      }, function(err, newUser) {
        if (err) throw err;
        console.log('the registered user is', newUser);
        req.session.username = req.body.username;
        req.session.logined = true;
        res.redirect('/');
      });
    }
  });
});


//使用者登入會員功能
router.post('/login',function(req,res,next){
  var getname = req.body.username;
  var getpwd = req.body.password;
    Users.findOne({username:getname},function(err,existUsername){
        if(err) throw err;
        if(existUsername){
          Users.findOne({password:getpwd},function(err,existPwd){
            if(err) throw err;

            if(existPwd){
                //res.send('account correct')              
                req.session.logined = true;
                req.session.username = req.body.username;
                res.redirect('/');
            }else{//else existPwd
                    res.render('users/login',{
                      pwdalert:'password incorrect!'
                    });
                  }
              });
            }else{//else existUsername
              res.render('users/login',{
                namealert:'username incorrect!'
                })
              }//end if

      });//end Users.findOne({})
  });




module.exports = router;