const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
    //res.send('Dsiplay a list of posts');
    try{ 
        const posts = await Post.find();
        res.send(posts);
    } catch(error)  {
        res.send({message: error});
    }
});

// Create post
router.post('/', async (request, response) => {

    // response.send(request.body);
    // response.send(request.body.tags); // Dessa hanterar olika delar i objektet, tex .title / .tags / .author etc 

    const post = new Post({
        title:      request.body.title,
        content:    request.body.content,
        author:     request.body.author,
        tags:       request.body.tags
    })

    try {
        const savedPost = await post.save(); 
        response.send(savedPost);
    } catch (error) {
        response.send({message: error}); 
    }
});

// Get specific post 
router.get('/:postId', async (request, response) => {
    // response.send(request.params.postId);

    try {
        const post = await Post.findById(request.params.postId); 
        response.send(post);
    } catch (error) {
        response.send({message: error}); 
    }
}); 

// Update post
router.patch('/:postId', async (request, response) => {
    // response.send(request.body);
    // response.send(request.body.tags); // Dessa hanterar olika delar i objektet, tex .title / .tags / .author etc 
    // response.send(request.params.postId);

    try {
        const updatePost = await Post.updateOne(
            {_id: request.params.postId},
            {$set: {
                    title:      request.body.title,
                    content:    request.body.content,
                    author:     request.body.author,
                    tags:       request.body.tags
                }
            }
        ); 
        response.send(updatePost);
    } catch (error) {
        response.send({message: error}); 
    }
}); 

// Delete post
router.delete('/:postId', async (request, response) => {
    // response.send(request.body);
    // response.send(request.body.tags); // Dessa hanterar olika delar i objektet, tex .title / .tags / .author etc 
    // response.send(request.params.postId);

    try {
        const deletedPost = await Post.deleteOne(
            {_id: request.params.postId},
        ); 
        response.send(deletedPost);
    } catch (error) {
        response.send({message: error}); 
    }
});

module.exports = router;
