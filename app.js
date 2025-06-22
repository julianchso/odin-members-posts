import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import indexRouter from './routes/indexRouter.js';
import dbConnect from './db/mongo.js';
import { connection } from './db/database.js';
import { configDotenv } from 'dotenv';
import './config/passport.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

configDotenv();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// session setup
const MongoDBStore = MongoStore.create({
  mongoUrl: process.env.DB_URI,
  dbName: 'members_clubhouse',
  collectionName: 'sessions',
  ttl: 1000 * 60 * 60 * 24, // equals 1 day
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // equals 1 day (1000 milliseconds * 60 seconds * 60 minutes * 24 hours)
  },
});

console.log(process.env.DB_URI);

MongoDBStore.on('error', (err) => {
  console.log(err);
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      dbName: 'members_clubhouse',
      collectionName: 'sessions',
      ttl: 60 * 60 * 24,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // equals 1 day (1000 milliseconds * 60 seconds * 60 minutes * 24 hours)
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`express app listening on PORT: ${PORT}`);
});
