var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studentdb');

//status
var success = 'success';
var failed = 'failed';
var exist = 'exist';
//Schema for student model
var StudentSchema = mongoose.Schema({
  name  : String,
  class : String,
  username : String,
  password : String
});


var StudentModel = mongoose.model('Student', StudentSchema);

//Add user to database
router.get('/registerUser', function(req, res, next){
  var name = req.query.name;
  var studentClass = req.query.class;
  var username = req.query.username;
  var password = req.query.password;

  if(!name && !studentClass && !username && !password){
    console.log("Incomplete Parameters");
    res.send({ status : failed });
  }else{
    var newStudent = new StudentModel();
    newStudent.name = name;
    newStudent.class = studentClass;
    newStudent.username = username;
    newStudent.password = password;

    /* TODO : check whether user exist */
    StudentModel.findOne({ "username" : username }, function(err, found){
      if(err){
        res.send({ status : exist});
      }else if(found){
        res.send({ status : exist});
      }else{
        //save to db
        newStudent.save(function(err, registeredStudent){
          if(err){
            console.log(err);
            res.send({ status : failed });
          }else{
            res.send({ status : success});
          }
        });
      }
    });
  }

});

//Search For user in database
router.get('/checkUser', function(req, res, next){
  var username = req.query.username;
  var password = req.query.password;

  StudentModel.findOne({ "username" : username , "password" : password}, function(err, user){
    if(err){
      res.send({ status : failed });
    }else if(user){
      res.send({
        status : success ,
        user
      });
    }else {
      res.send({ status : "failed"});
    }
  });
});


//delete a student
router.delete('/delete/:username', function(req, res, next){
  var username = req.params.username;

  StudentModel.findOneAndRemove({ username : username}, function(err){
    if(err){
      console.log(err);
      res.send({ status : failed });
    }else{
      res.send({ status : success });
    }
  });
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//update student details
router.put('/update/:username', function(req, res, next){
  var username = req.params.username;
  var password = req.query.password;
  var studentClass = req.query.class;
  var name = req.query.name;

  StudentModel.findOne({ username : username }, function(err, found){
    if(err||!found){
      console.log(err);
      res.send({ status : failed});
    }else {
      if(username)
          found.username = username;

      if(password)
          found.password = password;

      if(studentClass)
          found.class = studentClass;

      if(name)
          found.name= name;

      found.save(function(err, savedObject){
        if(err){
          console.log(err);
          res.send({ status : failed});
        }else {
          console.log('Updated' + savedObject);
          res.send({ status : success});
        }
      });
    }
  });

});

module.exports = router;
