import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(() => console.log('DB not connected'));
};

export default dbConnect;
