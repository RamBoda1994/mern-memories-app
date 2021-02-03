const express = require('express');

const {getPosts, createPost, updatePost, deletePost, likePost} = require('../controllers/posts');

const postsRouter = new express.Router();

postsRouter.get('/', getPosts);

postsRouter.post('/', createPost);

postsRouter.patch('/:id', updatePost);

postsRouter.delete('/:id', deletePost);

postsRouter.patch('/:id/likePost', likePost);

module.exports = postsRouter;