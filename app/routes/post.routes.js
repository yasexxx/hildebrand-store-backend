const { post } = require('../models');
const postController = require('./../controllers/post.controller');

const router = require("express").Router();

module.exports = function(app) {

    const apiUrl = '/api/v1/en-PH/post';

    router.post('/create/:id', postController.createPost);

    router.get('/query', postController.getPostByTitle);

    router.get('/all', postController.getAllPost);

    router.get('/user', postController.getPostByUser);

    router.get('/each-post', postController.getPostEachByUserTitle);

    router.put('/change', postController.updatePost);

    router.delete('/delete', postController.deletePost);

    app.use(apiUrl, router);
    
}