var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var model=require('../../model/model');
var mongoose=require('mongoose');

console.log('here-');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/post-comment',(req,res)=>{
    
    var commentObj;
    var time=new Date();
    if(req.body.main=="1"){
        commentObj={
            value:req.body.value,
            main:req.body.main,
            //commentedUser:req.secure._id,
            commentedTime:time
        }
    }
    else{
        console.log('why       ');
        commentObj={
            value:req.body.value,
            main:req.body.main,
            replyto:req.body.commentId,
            //commentedUser:req.secure._id,
            commentedTime:time
        }
    }
    model.comments.create(commentObj,(err,doc)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send({'success':'True'})
        }
    });
});

router.get('/get-comment',(req,res)=>{
    model.comments.find({main:"1"}).sort({commentedTime:1}).exec((err,doc)=>{
        res.send({'success':'True','doc':doc});
    });
});

router.post('/delete-comment',(req,res)=>{
    model.comments.remove({_id:mongoose.Types.ObjectId(req.body.comment_id)},(err,doc)=>{
        if(!err){
            model.comments.find({}).sort({commentedTime:1}).exec((err,doc)=>{
                res.send({'success':'True','doc':doc});
            });
        }
    })
});

router.get('/get-replies',(req,res)=>{
    model.comments.find({main:"0"}).sort({commentedTime:1}).exec((err,doc)=>{
        console.log(doc);
        res.send({'success':'True','doc':doc});
    });
});

module.exports = router;