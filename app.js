import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';

import indexRouter from './routes/indexRouter.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dbConnect from './db/mongo.js';

// session setup

const MongoStore = connectMongo(session);

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' });

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 100 * 60 * 60 * 24, // equals 1 day
    },
  })
);

// express

dbConnect();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`express app listening on PORT ${3000}`);
});
