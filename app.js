import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import ConnectMongoDBSession from 'connect-mongodb-session';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import session from 'express-session';
import passport from 'passport';

import indexRouter from './routes/indexRouter.js';
import { connection } from './db/database.js';
import passportConfig from './config/passport.js';
import dbConnect from './db/mongo.js';
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

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`express app listening on PORT: ${PORT}`);
});
