const mongoose = require('mongoose');

const PostSchema =new mongoose.Schema({
    taskname : {
        type: String,
        required : true
    },
    taskdescription :{
        type: String,
        required : true
    },
    creator : {
        type: String,
        required : true
    },
    duration : {
        type: Date,default:Date.now
    },
    createat : {
        type: String,
        required : true   
    }
})



const Postdata = mongoose.model('Postdata',PostSchema);

PostSchema.index({"createdAt":1},{expireAfterSeconds:1800});

module.exports = Postdata;