const express = require('express');
const router = express.Router();

const Post = require('../../controllers/post/post');
const User = require('../../controllers/user/user');

// Create a post
router.post('/post/create-post', Post.createPost);
// update a post 
router.put('/post/update-post/:id', Post.updatePost);
//delete a post 
router.get('/post/delete-post/:id', Post.deletePost);
//like a post

router.put('/post/like-post/:id', Post.likePost);

//dislike a post 

router.put('/post/dislike-post/:id', Post.dislikePost);

//get a post

//get timeline posts

//get all posts


module.exports = router;