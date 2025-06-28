import { Post, Members } from '../db/database.js';

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
      date: '****',
      posts: posts,
    });
  }
};

const newPostGet = (req, res) => {
  res.render('newPost', {
    user: req.user,
    title: 'New Post',
  });
};

const newPostPost = (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    post: req.body.post,
    date: new Date(),
    username: req.user.username,
    user_id: req.user._id.valueOf(),
  });

  let postId;

  newPost.save();

  const getPostID = () => {
    postId = newPost._id.valueOf();
  };

  getPostID();

  const addPostToUserArray = async (userId, postId) => {
    try {
      const updateUserPost = await Members.findByIdAndUpdate(
        userId,
        { $push: { post_id: postId } },
        { new: true }
      );

      if (updateUserPost) {
        console.log('Post added successfully to user', updateUserPost);
      } else {
        console.log('post not updated to user');
      }
    } catch (err) {
      console.log(err);
    }
  };

  addPostToUserArray(req.user._id, postId);

  res.redirect('/posts');
};

export default { postsGet, newPostGet, newPostPost };
