import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password_hash: { type: String },
  artist_list: [{ type: ObjectId, ref: 'Artist' }],
  album_list: [{ type: ObjectId, ref: 'Album' }],
  song_list: [{ type: ObjectId, ref: 'Song' }],
});

const User = mongoose.model('User', userSchema);

export default User;



