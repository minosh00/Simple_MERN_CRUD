const express = require('express');
const posts = require('../models/posts');
const Posts = require('../models/posts');

const router = express.Router();


router.post('/post/save', (req, res)=>{

    let newPost = new Posts(req.body);

    newPost.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });


        }

        return res.status(200).json({
            success:"post save sucess"
        });
        
    });



});


router.get('/posts', (req, res)=>{


    posts.find().exec((err, posts)=>{
        if(err){
            return res.status(400).json({
               error:err

            });
        }

  
return res.status(200).json({

    success:true,
    existingPosts:posts
});

    });

});




//get a  specific post 


router.get("/post/:id", (req, res) =>{
    let postId = req.params.id;

    Posts.findById(postId,(err,post)=>{

        if(err){
            return res.status(400).json({success:false, err});


        }

        return res.status(200).json({
            success:true,
            post
        })
    });

})












router.put('/post/update/:id', (req, res)=>{

     Posts.findByIdAndUpdate(
         req.params.id,{
             $set:req.body

         },
         (err, post)=>{
             if(err){
                 return res.status(400).json({error:err});

             }
             return res.status(200).json({
                 success:"updated succesfully"
             });
         }
     );
});

router.delete('/post/delete/:id' , (req, res )=>{

    Posts.findByIdAndRemove(req.params.id).exec((err , deletePost)=>{

        
        if(err) return res.status(400).json({

            message:"delete unc=scessfull", err

        });
        return res.json({
            message:"delete sucessfull" , deletePost
        });

    });

});














module.exports=router;
