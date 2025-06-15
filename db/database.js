import mongoose, { mongo } from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv();

const conn = process.env.DB_STRING1;

const connection = mongoose.createConnection(conn, {});

const userSchema = new mongoose.Schema({
  'full-name': String,
  username: String,
  hash: String,
  salt: String,
  post_id: Array,
  'membership-status': Boolean,
  admin: Boolean,
});

const postsSchema = new mongoose.Schema({
  id: String,
  title: String,
  message: String,
  date: Date,
  user_id: String,
});

const sessionSchema = new mongoose.Schema({
  sid: String,
  Expres: Date,
});

const User = connection.model('Users', userSchema);
const Post = connection.model('Posts', postsSchema);
const Session = connection.model('Sessions', sessionSchema);

export default connection;
