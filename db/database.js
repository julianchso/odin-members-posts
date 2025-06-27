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
  username: String,
});

const Members = mongoose.model('members', memberSchema);
const Post = mongoose.model('posts', postsSchema);

export { connection, Members, Post };
