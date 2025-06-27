import { Members } from '../db/database.js';

const allMembersGet = async (req, res) => {
  const numberOfPosts = await getNumberOfPosts();

  res.render('members', {
    title: 'Members',
    numberOfPosts: numberOfPosts,
  });
  console.log(`number of posts: ${numberOfPosts}`);
};

const getNumberOfPosts = async (req, res) => {
  const getMembers = await Members.find({});

  const numberOfPosts = [];
  getMembers.forEach((user) => {
    let postCount = user['post_id'].length;
    let username = user.username;

    const obj = {};
    obj[username] = postCount;
    numberOfPosts.push(obj);
  });

  return numberOfPosts;
};

export default { allMembersGet };
