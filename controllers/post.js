// Posts request logic 
const Post = require('../models/post')
const { validationResult } = require('express-validator')

exports.getPosts = (req, res) => {
    const posts = Post.find().select('_id title body')
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.error(`\nError in getting from DB:\n`, err)
        res.status(400).send('Error occurred on getting posts')
    })
}

exports.getPost = (req, res) => {
    const post = Post.findById(req.params._id).select('_id title body')
    .then(post => {
        res.json({post})
    })
    .catch(err => {
        console.error(`\nError in getting from DB:\n`, err)
        res.status(400).send('Error occurred on getting posts')
    })
}

exports.updatePost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  
    
    const post = Post.findById(req.params._id)
    .then((post) => {

        for (let key of Object.keys(req.body)) {
            if (post[key] !== req.body[key]) {
                console.log(`Field ${key} is diffrent\nchange from: ${post[key]}\nto: ${req.body[key]}`)
                post[key] = req.body[key]
            }
        }

        post.save().then(post => {
            console.log(`\nUpdate post:\n`, post)
            res.json({msg : 'Post updated successfully!', post})
        })
        .catch(err => {
            console.error(`\nError in saving on DB:\n`, err)
            res.status(400).send('Error occurred on update 😪')
        })
    })
    .catch(err => {
        console.error(`\nError in saving on DB:\n`, err)
        res.status(400).send('Error occurred on update 😪')
    })

}

exports.deletePost = (req, res) => {
    const post = Post.findByIdAndDelete({ _id : req.params._id})
    .then(post => {
        console.log(`\nDelete post:\n`, post)
        res.json({msg: 'Post deleted successfully',  post})
    })
    .catch(err => {
        console.error(`\nError in delete on DB:\n`, err)
        res.status(400).send('Error occurred on delete post')
    })
}

exports.createPost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  

    const post = Post(req.body)
    post.save()
    .then(() => {
        console.log(`\nCreating new post:\n`, post)
        res.json({msg : 'Post saved successfully', post})
    })
    .catch(err => {
        console.error(`\nError in saving on DB:\n`, err)
        res.status(400).send('Error occurred on saving')
    })
}