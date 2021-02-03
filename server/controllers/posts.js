const PostMessage = require('../models/postMessage');

const getPosts = async (req, res) => {
    try {
        const posts = await PostMessage.find();
        res.send(posts);
    }
    catch(error) {
        res.status(404).send({message: error.message});
    }
}

const createPost = async (req, res) => {
    console.log(req.body);
    try{
        const post = req.body;
        const newPost = new PostMessage(post);
        await newPost.save();
        res.status(201).send(newPost);
    }
    catch(error) {
        res.status(409).send({message: error.message});
    }
} 

const updatePost = async (req, res) => {
    const {id} = req.params;
    const newPostData = req.body;
    try {
        const post = await PostMessage.findById(id);
        if(!post) {
            return res.status(404).send('No post is found with given id');
        }
        console.log(post);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, newPostData, {new: true});
        res.send(updatedPost);
    }
    catch(error) {
        res.status(400).send();
    }
}

const deletePost = async (req, res) => {
    const {id} = req.params;
    try {
        const post = await PostMessage.findById(id);
        if(!post) {
            return res.status(404).send('No post is found with the given id');
        }
        await PostMessage.findByIdAndDelete(id);
        res.send();
    }
    catch(error) {
        res.status(500).send();
    }
}

const likePost = async (req, res) => {
    const {id} = req.params;
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, {$inc: {likeCount: 1}}, {new: true});
        res.send(updatedPost);
    }
    catch(error) {
        res.status(500).send();
    }
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
}