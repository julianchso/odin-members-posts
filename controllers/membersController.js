import { Members } from '../db/database.js';
import { configDotenv } from 'dotenv';

configDotenv();

const allMembersGet = async (req, res) => {
  const numberOfPosts = await getNumberOfPosts();

  res.render('members', {
    user: req.user,
    title: 'Members',
    numberOfPosts: numberOfPosts,
  });
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

const membershipGet = (req, res) => {
  const riddle = 'What comes once in a minute, twice in a moment, but never in a thousand years?';

  res.render('membership', {
    user: req.user,
    title: 'membership',
    riddle: riddle,
  });
};

const membershipPost = async (req, res) => {
  const answer = process.env.RIDDLEANSWER.toLowerCase();
  const userAnswer = req.body.answer.toLowerCase();
  const sessionUserID = req.session.passport.user;

  if (userAnswer == answer) {
    const filter = { _id: sessionUserID };
    const update = { 'membership-status': true };

    await Members.findOneAndUpdate(filter, update, {
      new: true,
    });
  } else {
    console.log('Wrong answer. Try again.');
  }
};

export default { allMembersGet, membershipGet, membershipPost };
