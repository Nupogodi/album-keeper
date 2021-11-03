import express from 'express';
import { requireAuth } from '../middleware/index';
import { Artist, Album, Song, User } from '../models/index';
import chalk from 'chalk';

const router = express.Router();

// retreives a list of user songs
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const userID = req.user._id;

    const populateQuery = [
      {
        path: 'artist',
        select: ['artist_name'],
      },
      {
        path: 'album',
        select: ['album_title'],
      },
    ];

    const songs = await Song.find({ user: userID })
      .select('-user -__v')
      .populate(populateQuery)
      .exec();

    if (!songs)
      return res.status(404).json({ error: 'There are no songs to display.' });

    res.status(200).json(songs);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// @POST api/song/ - Private - add a song to an album
// router.post('/', requireAuth, async (req, res, next) => {
//   try {
//     const userID = req.user._id;

//     const { songTitle, songDuration, artistName, albumTitle,  } = req.body;

//     if (!songTitle || !songDuration || !artistName || !albumTitle)
//       return res.status(400).json({
//         error: 'Please fill all fields.',
//         missing: { songTitle, songDuration, artistName, albumTitle },
//       });

//     let user = await User.findOne({ _id: userID });
//     let album = await Album.findOne({ album_title: albumTitle, user: userID });
//     let artist = await Artist.findOne({
//       artist_name: artistName,
//       user: userID,
//     });

//     if (!album) return res.status(400).json({ error: 'Album does not exist.' });

//     if (!artist)
//       return res.status(400).json({ error: 'Artist does not exist.' });

//     let song = await Song.findOne({
//       song_title: songTitle,
//       user: userID,
//       album: album._id,
//       artist: artist._id,
//     });

//     if (song) {
//       return res
//         .status(400)
//         .json({ error: 'You have already added this song' });
//     }

//     song = new Song({
//       song_title: songTitle,
//       song_duration: songDuration,
//       artist: artist._id,
//       album: album._id,
//       user: userID,
//     });

//     await song.save();

//     album.song_list.push(song._id);

//     artist.song_list.push(song._id);
//     user.song_list.push(song._id);

//     await album.save();
//     await artist.save();
//     await user.save();

//     res.status(200).json({ msg: 'Song has been added.', song });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// @POST create a new song
// Desc: Private
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const userID = req.user._id;

    const { songTitle, songDuration, artistName, albumTitle, albumReleaseYear } = req.body;

    let user = await User.findOne({ _id: userID });
    let artist = await Artist.findOne({ artist_name: artistName, user: userID });
    let album = await Album.findOne({ album_title: albumTitle, user: userID });

    if (!artist) {
      artist = new Artist({
        artist_name: artistName,
        band_members: [],
        album_list: [],
        user: userID,
      });
    }

    if(!album) {
      album = new Album({
        artist: artist._id,
        album_title: albumTitle,
        description: '',
        release_year: albumReleaseYear,
        user: userID,
      })
    }


    let song = await Song.findOne({
      song_title: songTitle,
      song_duration: songDuration,
      user: userID,
      album: album._id,
      artist: artist._id,
    });

    if (song) {
      return res
        .status(400)
        .json({ error: 'You have already added this song' });
    }

    song = new Song({
      song_title: songTitle,
      song_duration: songDuration,
      artist: artist._id,
      album: album._id,
      user: userID,
    });

    await song.save();

    album.song_list.push(song._id);
    artist.song_list.push(song._id);
    user.song_list.push(song._id);

    await album.save();
    await artist.save();
    await user.save();

    res.status(200).json({msg: 'New song has been added!', song});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// @PUT Update a Song
// Desc: Private
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const userID = req.user._id;
    const { id } = req.params;

    const { artist, song_title, song_duration } = req.body;

    let song = await Song.findOne({ _id: id, user: userID });

    if (!song) {
      return res.status(404).json({ error: 'Song does not exist.' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// @DELETE Delete a Song for all models using song id
// Desc: Private
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
