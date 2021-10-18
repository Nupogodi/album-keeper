import express from 'express';
import { requireAuth } from '../middleware/index';
import { Artist, Album, Song, User } from '../models/index';
import chalk from 'chalk';

const router = express.Router();

// @GET /api/album/ (Private) - fetches all albums
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;

    const populateQuery = [
      {
        path: 'artist',
        select: ['artist_name', 'band_members'],
      },
      { path: 'song_list', select: ['song_title', 'song_duration'] },

      {
        path: 'song_list',
        select: ['artist', 'song_title', 'song_duration', 'album'],
      },
    ];

    const albums = await Album.find({ user: _id })
      .sort({ album_title: 'asc' })
      .populate(populateQuery)
      .exec();

    res.status(200).json(albums);
    console.log(albums);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// @GET /api/album/:id (Private) - fetches album by id
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    // user ID
    const userId = req.user._id;

    // Album ID
    const { id } = req.params;

    const populateQuery = [
      {
        path: 'artist',
        select: [
          '-album_list',
          '-band_members',
          '-description',
          '-song_list',
          '-user',
          '-__v',
        ],
      },
      {
        path: 'song_list',
        select: ['song_title', 'song_duration', 'artist', 'album'],
        populate: [
          { path: 'artist', select: ['artist_name'] },
          { path: 'album', select: 'album_title' },
        ],
      },
    ];
    const album = await Album.findOne({ user: userId, _id: id })
      .select('-user -__v')
      .populate(populateQuery)
      .exec();

    if (!album) return res.status(401).json({ error: 'Album does not exist.' });

    res.status(200).json(album);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// add new album (create new artist, if doesn't exist)
// @POST api/album/
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { username } = req.user;

    const { artist_name, album_title, album_release_year } = req.body;

    let user = await User.findOne({ username: username });

    // check if the artist already exists in user's library
    let artist = await Artist.findOne({
      user: user._id,
      artist_name: artist_name,
    });

    if (!artist) {
      artist = new Artist({
        artist_name: artist_name,
        band_members: [],
        album_list: [],
        song_list: [],
        user: user._id,
      });
    }

    // check if the album under that artist already exists in user's library
    let album = await Album.findOne({
      user: user._id,
      artist: artist._id,
      album_title: album_title,
    });

    if (album) {
      return res
        .status(400)
        .json({ error: 'You have already added this album.' });
    }

    album = new Album({
      artist: artist._id,
      album_title: album_title,
      release_year: album_release_year,
      song_list: [],
      user: user._id,
    });

    // check if the song already exists in album in user's library

    // check if the artist is already in users model
    if (!user.artist_list.includes(artist._id)) {
      user.artist_list.push(artist._id);
    }

    if (!artist.album_list.includes(album._id)) {
      artist.album_list.push(album._id);
    }

    user.album_list.push(album._id);

    await user.save();
    await artist.save();
    await album.save();
    return res.status(200).json({ msg: 'New album has been added', album });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// @PUT api/album/:id - Private - update existing album
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    // user ID
    const userId = req.user._id;

    // Album ID
    const { id } = req.params;

    let album = await Album.findOne({ user: userId, _id: id });
    if (!album) return res.status(400).json({ error: 'Album does not exist.' });

    const {
      albumTitle = album.album_title,
      description = album.description,
      releaseYear = album.release_year,
    } = req.body;

    album.album_title = albumTitle;
    album.description = description;
    album.release_year = releaseYear;

    await album.save();

    res.status(200).json({ msg: 'Album has been updated!', album });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//@DELETE api/album/:id - Private - delete album by id
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    // user ID
    const userId = req.user._id;

    // Album ID
    const { id } = req.params;

    let album = await Album.findOne({user: userId, _id: id})

    let artist = await Artist.findOne({user: userId, _id: album.artist._id})

    if(!album) return res.status(400).json({msg: 'Album does not exist.'})

    for (let i = 0; i < album.song_list.length; i++){
      let songId = album.song_list[i]._id;
      let song = await Song.findOne({user: userId, _id: songId})
      artist.song_list.splice(artist.song_list.indexOf(songId), 1)
      const songDeleted = await Song.findByIdAndDelete(songId);
    }

    const albumDeleted = await Album.findByIdAndDelete(id);

    await artist.save();

    res.status(200).json({msg: "Album deleted!"})


  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
