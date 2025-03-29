const express =require('express');
const app=express();
const router=express.Router();
const bodyparser=require('body-parser');
const User=require('../../schemas/userschemas');
const Post=require('../../schemas/postschema');

app.use(bodyparser.urlencoded({extended: false}));

router.get("/",(req,res,next)=>{
})

router.post("/",async(req,res,next)=>{
    if(!req.body.content){
        console.log("El dato recibido no contiene nada.");
        return res.sendStatus(400);
    }

    var postData={
        content:req.body.content,
        postedBy:req.session.user
    }

    Post.create(postData)
    .then(async newPost=>{
        newPost=await User.populate(newPost,{path:"postedBy"})
        res.status(201).send(newPost);
    })
    .catch(err=>{
        console.log(err);
        res.sendStatus(400);
    })
   
})

module.exports=router;