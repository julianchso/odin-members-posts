import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv();

const { Schema } = mongoose;

const conn = process.env.DB_URI;
const connection = mongoose.createConnection(conn);

const memberSchema = new Schema({
  'full-name': String,
  username: String,
  hash: String,
  salt: String,
  post_id: Array,
  'membership-status': Boolean,
  admin: Boolean,
});

const postsSchema = new Schema({
  id: String,
  title: String,
  post: String,
  date: Date,
  user_id: String,
});

const sessionSchema = new Schema({
  sid: String,
  Expres: Date,
});

const Member = mongoose.model('members', memberSchema);
const Post = mongoose.model('posts', postsSchema);
const Session = mongoose.model('sessions', sessionSchema);

export { connection, Member, Post, Session };
