var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/comments");
mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
    console.log('Could not connect to mongo server!');
    console.log(err);
});

module.exports.user=mongoose.model('user',new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    }
}));

module.exports.comments=mongoose.model('comments',new Schema({
    value:{
        type:String
    },
    main:{
        type:Boolean
    },
    replyto:{
        type:Schema.Types.ObjectId,
        ref:'comments'
    }/*,
    commentedUser:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }*/,
    commentedTime:{
        type:Date
    }
}));
