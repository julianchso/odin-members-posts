const newPostGet = (req, res) => {
  res.render('/newPost', {
    title: 'New Post',
  });
};

export { newPostGet };
