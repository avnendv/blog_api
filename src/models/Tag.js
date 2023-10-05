import { Schema, model } from 'mongoose';
import { STATUS } from '@/config/constants';

const Tag = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  description: {
    type: String,
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

Tag.methods.toResource = function () {
  return {
    name: this.name,
    description: this.description,
    isShowTop: this.isShowTop,
    status: this.status,
  };
};

export default model('tag', Tag);
