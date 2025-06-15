import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';

import indexRouter from './routes/indexRouter.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { connection } from './db/database.js';
// import passport from './config/passport.js';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dbConnect from './db/mongo.js';
import { configDotenv } from 'dotenv';
configDotenv();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// session setup

app.use('/', indexRouter);

app.use(passport.initialize());
app.use(passport.session());

const MongoStore = ConnectMongoDBSession(session);

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

dbConnect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log(`express app listening on PORT: ${PORT}`);
});
