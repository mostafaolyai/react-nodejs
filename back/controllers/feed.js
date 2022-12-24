const { validationResult } = require('express-validator')

const Post = require('../models/post')
const io = require('../socket')

exports.getPosts = (req, res, next) => {
  console.log('tamam',io.getIO().emit('postss', { action: 'create', post: 'haha' }))
  
  res.status(200).json({
    posts: [{
      _id: 1, 
      title: 'First Post', 
      content: 'This is the first post!',
      creator: {
        name:"mosi",
      },
      createdAt: new Date() 
    }]
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(422).json({
      message: 'Validation Failed!',
      errors: errors.array()
    })
  }
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = 'images/duck';
  
  const post = new Post({
    title,
    content,
    imageUrl,
    creator:{
      name:'mosi'
    }
  })
  post
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
      });
    })
    .catch(err => console.log(err));
};
