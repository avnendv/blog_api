import { Schema, model } from 'mongoose';
import { STATUS } from '@/config/constants';

const Topic = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    min: 6,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  isShowTop: {
    type: Boolean,
    default: false,
  },
  thumbnail: String,
  description: String,
  status: {
    type: Number,
    enum: Object.values(STATUS),
    default: 1,
  },
});

export default model('topic', Topic);
