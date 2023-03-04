const Post = require("../../models/post/post");

module.exports.createPost = async function(req, res){
    try {
        
    const newPost = await Post.create(req.body);
    return res.status(200).json({
        "Message":"Post Created",
        "Post":newPost
    });   
    } catch (error) {
       return res.status(500).json({
            "Message":error.message
        });
    }
}
//update post user id

module.exports.updatePost = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId != req.body.userId){
            return res.status(403).json({
                "Message":"You can update only your post"
            });
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        return res.status(200).json({
            "Message":"Post Updated",
            "Post":updatedPost
        });
    } catch (error) {
        return res.status(500).json({
            "Message":error.message
        });
    }
}

//delete posts 

module.exports.deletePost = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId != req.body.userId){
            return res.status(403).json({
                "Message":"You can delete only your post"
            });
        }
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            "Message":"Post Deleted"
        });
    } catch (error) {
        return res.status(500).json({
            "Error":error.message
        });
    }
}

//like a post
module.exports.likePost = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json({
                "Message":"Post Liked"
            });
        }

    } catch (error) {
        return res.status(500).json({
            "Message":error.message
        });    
    }
    
}

//dislike a post 
module.exports.dislikePost = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);
        if(post.likes.includes(req.body.userId)){
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json({
                "Message":"Post Disliked"
            });
        }
        return  res.status(403).json({
            "Message":"Post already disliked"
        });
        
    } catch (error) {
        return res.status(500).json({
            "Message":error.message
        });    
    }
}