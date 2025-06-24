import { Post } from '../db/database.js';

const postsGet = (req, res) => {
  res.render('posts', {
    title: 'Posts',
  });
};

const newPostGet = (req, res) => {
  res.render('newPost', {
    title: 'New Post',
  });
};

const newPostPost = (req, res) => {
  console.log(req.user._id.valueOf());
  const newPost = new Post({
    title: req.body.title,
    post: req.body.post,
    date: new Date(),
    user_id: req.user._id.valueOf(),
  });

  newPost.save().then((post) => {
    console.log(post);
  });

  res.redirect('/posts');
};

// const postsSchema = new Schema({
//   id: String,
//   title: String,
//   post: String,
//   date: Date,
//   user_id: String,
// });

export default { postsGet, newPostGet, newPostPost };
