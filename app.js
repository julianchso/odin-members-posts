import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import { configDotenv } from 'dotenv';
import './config/passport.js';
import indexRouter from './routes/indexRouter.js';
import postsRouter from './routes/postsRouter.js';
import membersRouter from './routes/membersRouter.js';
import dbConnect from './db/mongo.js';

configDotenv();

const PORT = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// session setup

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: 'members_clubhouse',
      collectionName: 'sessions',
      ttl: 60 * 60 * 24,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/members', membersRouter);

dbConnect();

app.listen(PORT, () => {
  console.log(`express app listening on PORT: ${PORT}`);
});
