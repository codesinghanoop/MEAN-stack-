//server.js
var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('contactlist',['contactlist']);
var bodyparser=require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());
app.get('/contacts',function(req,res){
db.contactlist.find(function(err,docs){
  res.json(docs);
  });

  });
  app.post('/contacts',function(req,res){
   db.contactlist.insert(req.body,function(err,docs){
      res.json(docs);
     });
    });
app.delete('/contacts/:id',function(req,res){
  var id=req.params.id;
   db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
       res.json(doc);
     });
   });
 app.get('/contacts/:id',function(req,res){
   var id=req.params.id;
   db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
     res.json(doc);
     });
   });
 app.put('/contacts/:id',function(req,res){
   var id=req.params.id;
   db.contactlist.findAndModify({query :{_id:mongojs.ObjectId(id)},update: {$set : {name:req.body.name,email:req.body.email,number:req.body.email}},new:true},function(err,doc){
         res.json(doc);
     });
   });
app.listen(8888);
