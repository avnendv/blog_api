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

Topic.methods.toResource = function () {
  return {
    name: this.name,
    slug: this.slug,
    thumbnail: this.thumbnail,
    description: this.description,
    isShowTop: this.isShowTop,
    status: this.status,
  };
};

export default model('topic', Topic);
