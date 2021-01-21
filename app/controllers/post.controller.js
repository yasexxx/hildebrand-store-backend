const db = require('./../models');
const Post = db.post;
const User = db.user;
const chalk = require('chalk');
const notification = require('./notification.controller');

exports.createPost = async (req, res) => {
    try {
        const userId = req.params.id;
        const userPost = req.body;
        userPost.title = userPost.title.trimEnd();
        Post.countDocuments({ title: userPost.title}, function (err, count) {
            if (err || count > 0){
                res.status(500).send( {message: err || "The title is already exists, try to use another title!",
            success: false} );
            return;
            } else if (!err && count === 0) {
                User.findOne( { _id: userId}, (err, user) => {
                    if(err){
                        console.log(err);
                        res.status(500).send({message: err});
                        return
                    }
                    const post = new Post({
                        title: (userPost.title).trimEnd(),
                        tags: userPost.tags,
                        published: userPost.published,
                        message: userPost.message,
                        user: user._id,
                        author: user.firstname+' '+user.lastname
                    });
                    post.save( (err, result) => {
                        if(err){
                            console.log(err);
                            res.status(500).send({message: err});
                        }
                        console.log(chalk.green('User has post'));
                        res.status(200).send({
                            message: 'Post was successfully created',
                            success: true });
                        notification.createNotification(
                            userId, `You created a post ${result.title}`,
                            'post', 'notifications-circle'
                        );
                        
                    });
                    }); 
            }
        }); 
               
    } catch (error) {
        console.log(error);
    }
}

exports.getPostByTitle = async (req, res) => {
    try {
        const title = req.query.title;
        let list1 = {title: title}
        Post.findOne(list1)
        .then( data => {
            res.send(data);
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Some error occured while getting post."
            })
        });
    } catch (error) {
        console.log(error);
    }
}


exports.getPostByUser = async (req, res) => {
    try {
        const user = req.query.user;
        let userQuery = { user: user}
        Post.find(userQuery)
        .then( data => {
            res.send(data);
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Some error occured while getting post."
            })
        });
    } catch (error) {
        console.log(error);
    }
}

exports.getPostEachByUserTitle = async (req, res) => {
    try {
        const user = req.query.user;
        const title = (req.query.title);
        
        Post.findOne({ title: title, user: user }, function(err, result){
            if (err){
                console.log(err);
                return;
            }
            console.log(result, 'result');
        })
        .then( (data) => {
            if(!data){
                res.status(500).send({message: 'Cannot find post'});
                return;
            }
            res.send(data);
        })
        .catch( err => {
            res.status(500).send({
                message: err || "Some error occured while getting post."
            })
        });
    } catch (error) {
        console.log(error);
    }
}


exports.getAllPost = async (req, res) => {
    try {
        const title = req.query.title;
        let listOfTitle = title ? { title: { $regex: new RegExp(title), $options: "i" } }: {};
    
        Post.find(listOfTitle)
        .then( data => {
            res.send(data);
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Some error occured while getting post."
            })
        }); 
    } catch (error) {
        console.log(error);
    }
}


exports.updatePost = async (req,res) => {
    try {
        const id = req.query.post;
        const userPost = req.body;
        userPost.title = userPost.title.trimEnd();
        Post.findByIdAndUpdate( id, userPost, { useFindAndModify: false} , function( err, doc, res) {
            if(err) { console.log(err);} })
        .then(data => {
            if(!data) {
                res.status(404).send( {
                    message: ` Cannot update post with id=${id}. Check if post exist!`,
                    success: false
                });
            }
            res.status(200).send( { message: `The post ${data.title} was successfully updated!`,
                    success: true, payload: data.user});
        })
        .catch( err => {
            res.status(500).send( {
                message: `Error updating post with id: ${id}`,
                success: false
            });
        });
    } catch (error) {
        console.log(error);
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = req.query.delete;
        const num = req.query.num;
        if(post === 'post'){
            Post.findByIdAndDelete(num).then(
            data => {
                if(!data){
                    res.status(500).send({message: 'Error occured!'})
                }
                res.status(200).send({message: `Successfully deleted post with id ${num}`})
            }
            ).then(
                err => {console.log(err);}
            )
            return;
        }
        res.status(500).send({message: 'Error deleting post.'})

    } catch (error) {
        console.log(error);
    }
}