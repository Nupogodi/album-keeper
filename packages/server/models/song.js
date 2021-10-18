import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const requiredString = {
  type: String,
  required: true,
};

const songSchema = new mongoose.Schema({
  artist: { type: ObjectId, ref: 'Artist', default: 'Misc' },
  song_title: requiredString,
  song_duration: { type: Number, required: true },
  album: { type: ObjectId, ref: 'Album' },
  user: { type: ObjectId, ref: 'User', required: true },
});

const Song = mongoose.model('Song', songSchema);

export default Song;
