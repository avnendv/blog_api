import { Schema, model } from 'mongoose';

const BookMark = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'post', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
});

export default model('bookMark', BookMark);
