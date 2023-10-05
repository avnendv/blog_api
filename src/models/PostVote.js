import { Schema, model } from 'mongoose';
import { VOTE } from '@/config/constants';

const PostVote = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'post', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  voteType: {
    type: Number,
    enum: Object.values(VOTE),
    default: 1,
  },
});

export default model('postVote', PostVote);
