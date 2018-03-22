var jwt = require('jsonwebtoken');
module.exports=function(){
    return function(req,res,next){
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(token){
            jwt.verify(token,"comment-secret",(err,user)=>{
                if(!err){
                    req.user=user;
                    next();
                }
            })
        }
    }
}