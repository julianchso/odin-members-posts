import mongoose, { mongo } from 'mongoose';
import { configDotenv } from 'dotenv';

main().catch((err) => console.log(err));

try {
  mongoose.connect(process.env.DB_STRING1);
} catch (err) {
  handleError(err);
}

const userSchema = new mongoose.Schema({
  'full-name': String,
  username: String,
  password: String,
  post_id: Array,
  'membership-status': Boolean,
  admin: Boolean,
});

const postsSchema = new mongoose.Schema({
  title: String,
  message: String,
  date: Date,
  user_id: String,
});

const sessionSchema = new mongoose.Schema({
  sid: String,
  Expres: Date,
});

const users = mongoose.model('Users', userSchema);
const posts = mongoose.model('Posts', postsSchema);
const session = mongoose.model('Sessions', sessionSchema);
