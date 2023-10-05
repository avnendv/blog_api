import { Schema, model } from 'mongoose';
import { STATUS } from '@/config/constants';

const Tag = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  isShowTop: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Number,
    enum: Object.values(STATUS),
    default: 1,
  },
});

export default model('tag', Tag);
