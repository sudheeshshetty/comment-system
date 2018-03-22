var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var model=require('../../model/model');
var jwt = require('jsonwebtoken');


router.post('/checkuser',(req,res)=>{
    model.user.findOne({email:req.body.email},(error,user)=>{
        if(!user){
            model.user.create({name:req.body.name,email:req.body.email},(err,data)=>{
                var token = jwt.sign({ email: data.email }, "comment-secret", {
                    expiresIn: 86400 // expires in 24 hours
                });
            })
        }
        else{
            var token = jwt.sign({ email: user.email }, "comment-secret", {
                expiresIn: 86400 // expires in 24 hours
            });
        }
    });
});

module.exports = router;
