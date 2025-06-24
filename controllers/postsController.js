import { Post } from '../db/database.js';

const postsGet = async (req, res) => {
  const posts = await Post.find({});

  if (req.user) {
    res.render('posts', {
      title: 'Posts',
      user: req.user.username,
      posts: posts,
    });
  } else {
    res.render('posts', {
      title: 'Posts',
      user: '****',
      posts: posts,
    });
  }
};

const newPostGet = (req, res) => {
  res.render('newPost', {
    title: 'New Post',
  });
};

const newPostPost = (req, res) => {
  console.log(req.user.username);
  const newPost = new Post({
    title: req.body.title,
    post: req.body.post,
    date: new Date(),
    username: req.user.username,
    user_id: req.user._id.valueOf(),
  });

  newPost.save();

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
