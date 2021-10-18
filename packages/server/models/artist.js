import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const requiredString = {
  type: String,
  required: true,
};

const artistSchema = new mongoose.Schema({
  artist_name: requiredString,
  band_members: [{ type: String }],
  description: { type: String },
  album_list: [{ type: ObjectId, ref: 'Album' }],
  song_list: [{ type: ObjectId, ref: 'Song' }],
  user: { type: ObjectId, ref: 'User', required: true },
});

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
