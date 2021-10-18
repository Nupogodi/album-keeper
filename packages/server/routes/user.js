import express from 'express';
import { User } from '../models/index';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:uid', async (req, res, next) => {
  try {
    const populateQuery = [
      {
        path: 'artist_list',
        select: ['artist_name', 'band_members', 'song_list'],
        populate: { path: 'album_list', select: ['album_title'] },
      },
      {
        path: 'album_list',
        select: ['album_title', 'release_year', 'song_list'],
        populate: { path: 'artist', select: 'artist_name' },
      },
      {
        path: 'song_list',
        select: ['artist', 'song_title', 'song_duration', 'album'],
      },
    ];

    const { uid } = req.params;

    const user = await User.findById(uid).populate(populateQuery).exec();

    if (!user) res.status(404).json({ msg: 'User does not exist.' });

    res.status(200).json({
      artist_list: user.artist_list,
      album_list: user.album_list,
      song_list: user.song_list,
      username: user.username,
      uid: user._id,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
