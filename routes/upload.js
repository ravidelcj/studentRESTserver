var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');
var failed = "failed";
var success = "success";
// mongoose.connect('mongodb://localhost/studentdb');



var FileSchema = mongoose.Schema({
  name : String,
  class : String,
  path : String,
  subject : String
});

//
// var FileModel = mongoose.model('upload', FileSchema);
//
//
// var storage = multer.diskStorage({
//   destination : "./files",
//   filename : function(req, file, callback){
//     callback(null, file.originalName);
//   }
// });
// var upload = multer({ storage : storage }).any();
//
// upload(req, res, function(err){
//     if(err){
//       console.log("Upload Failed");
//       res.send({ status : failed});
//     }else {
//       console.log("Upload Successfull");
//       res.send({ status : success});
//     }
//  });
// //Uploading a file
// router.post('/', function(req, res, next){
//   var name = req.query.name;
//   var studentClass = req.query.class;
//   var path = req.query.path
//   var Subject = req.querySubject
//   if(!name && !studentClass && !path && !subject){
//     res.send({ status : failed});
//   }else {
//
//   }
// });

//Send WebPage for uploading flie
router.get('/fileUpload', function(req, res, next){
  res.sendFile(__dirname + "/uploadForm.html");
});

router.post('/fileUpload', function(req, res, next) {
  console.log(JSON.stringify(req.body.filename));
  res.send({ fileName : req.body.filename, class : req.body.class, subject : req.body.subject});
});

module.exports = router;
