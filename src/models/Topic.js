import { Schema, model } from 'mongoose';
import { STATUS } from '@/config/constants';
import { slugify } from '@/utils';

const Topic = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    min: 2,
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

Topic.pre('save', async function (next) {
  try {
    if (this.slug) {
      this.slug = slugify(this.slug, false);
      next();
      return;
    }

    this.slug = slugify(this.title);
    next();
  } catch (error) {
    next(error);
  }
});

Topic.pre('findOneAndUpdate', async function (next) {
  try {
    if (this._update.slug) {
      this._update.slug = slugify(this._update.slug, false);
      next();
      return;
    }

    this._update.slug = slugify(this._update.title);
    next();
  } catch (error) {
    next(error);
  }
});

Topic.methods.toResource = function () {
  return {
    title: this.title,
    slug: this.slug,
    thumbnail: this.thumbnail,
    description: this.description,
    isShowTop: this.isShowTop,
    status: this.status,
  };
};

export default model('topic', Topic);
