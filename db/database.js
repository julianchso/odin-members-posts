import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv();

const { Schema } = mongoose;

const conn = process.env.DB_STRING1;
const connection = mongoose.createConnection(conn);

const userSchema = new Schema({
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
  message: String,
  date: Date,
  user_id: String,
});

const sessionSchema = new Schema({
  sid: String,
  Expres: Date,
});

const User = mongoose.model('members', userSchema);
const Post = mongoose.model('posts', postsSchema);
const Session = mongoose.model('sessions', sessionSchema);

export { connection, User, Post, Session };
