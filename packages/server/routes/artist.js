import express from 'express';
import { requireAuth } from '../middleware/index';
import { Artist, Album, Song, User } from '../models/index';
import chalk from 'chalk';

const router = express.Router();

// @GET /api/artist/ (Private) - fetches all artists
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;

    const artists = await Artist.find({ user: _id });

    res.status(200).json(artists);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// @GET /api/artist/:id (Private) - fetches artist by id
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    // user ID
    const userId = req.user._id;

    // Artist ID
    const { id } = req.params;

    const populateQuery = [
      { path: 'album_list', select: ['album_title', 'release_year'] },

      {
        path: 'song_list',
        populate: { path: 'album', select: ['album_title'] },
      },
      {
        path: 'song_list',
        populate: { path: 'artist', select: ['artist_name'] },
      },
    ];
    const artist = await Artist.findOne({ user: userId, _id: id })
      .populate(populateQuery)
      .exec();

    if (!artist)
      return res.status(401).json({ error: 'Artist does not exist.' });

    res.status(200).json(artist);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// @POST /api/artist/ (Private) - create new artist
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user._id;

    const { artistTitle, bandMembers, description } = req.body;

    let artist = await Artist.findOne({
      user: userId,
      artist_name: artistTitle,
    });

    // validation
    if (artist) {
      return res.status(422).json({ error: 'This artist already exists.' });
    }

    artist = new Artist({
      artist_name: artistTitle,
      band_members: bandMembers,
      description: description,
      album_list: [],
      song_list: [],
      user: userId,
    });

    let user = await User.findOne({ _id: userId });

    user.artist_list.push(artist._id);

    await user.save();
    await artist.save();

    res.status(200).json({ msg: 'New artist has been created!', artist });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// @PUT /api/artist/:id (Private) - updates a current artist
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user._id;

    // artist ID
    const { id } = req.params;

    const { artistTitle, bandMembers, description } = req.body;

    let artist = await Artist.findOne({ user: userId, _id: id });

    // validation
    if (!artist) {
      return res.status(400).json({ error: 'This artist does not exist.' });
    }

    const artistUpdate = await Artist.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        artist_name: artistTitle,
        description: description,
        band_members: bandMembers,
      },
      { new: true }
    );

    res.status(200).json({ msg: 'Artist has been updated', artistUpdate });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
