var express= require('express');
var path= require('path');
var bodyparser=require('body-parser');
var model=require('./server/model/model');
var auth = require('./server/routes/auth/auth');
var verifyToken=require('./server/routes/auth/verifyToken');
var comment=require('./server/routes/comment/comment');

var app= express();


app.set('views',path.join(__dirname+'/dist/index.html'));
app.use(express.static('./dist'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
//app.engine('html',require('ejs').renderFile)



app.get('/',function(req,res,next){
    res.sendFile(path.resolve(__dirname+"/dist/index.html"));
});

//app.use(verifyToken());
//app.use('/authenticate',auth);
console.log('here-');
app.use('/comment',comment);

app.listen(3000,function(){
    console.log('server started on 3000');
});
