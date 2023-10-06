import { Schema, model } from 'mongoose';
import { VOTE } from '@/config/constants';

const PostInfo = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'post', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  voteType: {
    type: Number,
    enum: Object.values(VOTE),
    default: VOTE.NO_VOTE,
  },
  mark: {
    type: Boolean,
    default: true,
  },
});

export default model('postInfo', PostInfo);
