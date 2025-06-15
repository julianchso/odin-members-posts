import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
const members = connection.model.members;

import crypto from 'crypto';

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    members.findOne({ username: username }).then((user) => {
      if (!user) {
        return cb(null, false);
      }
    });
  })
);
