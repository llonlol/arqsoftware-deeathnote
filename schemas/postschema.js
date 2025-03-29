const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const postschema=new Schema({
    content:{type:String,trim:true},
    postedBy:{type:Schema.Types.ObjectId,ref:'User'},
    pinned:Boolean
},{timestamps:true});

var Post = mongoose.model('Post',postschema);
module.exports=Post;