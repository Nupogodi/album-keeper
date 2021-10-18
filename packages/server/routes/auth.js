import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/index';
import keys from '../config/keys';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.route('/').get((req, res, next) => {
  res.send('auth endpoint');
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res.status(422).json({ error: 'please add all the fields' });
  }

  if (password.split('').length < 8) {
    return res
      .status(400)
      .json({ error: 'The password must be between 8 and 20 characters.!' });
  }

  User.findOne({ username: username })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: 'user already exists with that name' });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          username,
          password_hash: hashedpassword,
        });

        user
          .save()
          .then((user) => {
            const userForToken = {
              username: user.username,
              id: user._id,
            };

            const token = jwt.sign(userForToken, keys.jwt.secret);

            res.status(200).json({
              msg: 'saved successfully',
              user: {
                username: user.username,
                token: token,
                artist_list: user.artist_list,
                album_list: user.album_list,
                song_list: user.song_list,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(422).json({ error: 'missing username or password' });
  }

  const user = await User.findOne({ username: username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password_hash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, keys.jwt.secret);
  res.status(200).send({ token, username, uid: user._id });
});

module.exports = router;
