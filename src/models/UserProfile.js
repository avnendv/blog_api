import { Schema, model } from 'mongoose';

const UserProfile = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  followed: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  googleUrl: String,
  facebookUrl: String,
  githubUrl: String,
  settings: {
    isUsedOtp: { type: Boolean, default: false },
  },
});

export default model('userProfile', UserProfile);
