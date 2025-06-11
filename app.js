import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { configDotenv } from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

configDotenv();

// database

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB not connected'));

// express

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`express app listening on PORT ${3000}`);
});
