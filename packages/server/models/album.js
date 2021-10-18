import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const requiredString = {
  type: String,
  required: true,
};

const albumSchema = new mongoose.Schema({
  artist: { type: ObjectId, ref: 'Artist' },
  album_title: requiredString,
  description: { type: String },
  release_year: requiredString,
  song_list: [{ type: ObjectId, ref: 'Song' }],
  user: { type: ObjectId, ref: 'User', required: true },
});

const Album = mongoose.model('Album', albumSchema);

export default Album;
