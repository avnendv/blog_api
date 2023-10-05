import { Schema, model } from 'mongoose';
import { POST_TYPE, PUBLISH, STATUS } from '@/config/constants';
import { slugify } from '@/utils';

const Post = new Schema({
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
  content: {
    type: String,
    required: true,
  },
  publish: {
    type: Number,
    enum: Object.values(PUBLISH),
    default: PUBLISH.DRAFT,
  },
  author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  viewed: { type: Number, default: 0 },
  postType: {
    type: Number,
    enum: Object.values(POST_TYPE),
    default: 1,
  },
  attr: {
    k: String,
    v: String,
  },
  tag: [{ type: String, ref: 'tag', field: 'name' }],
  topic: { type: Schema.Types.ObjectId, ref: 'topic', required: true },
  status: {
    type: Number,
    enum: Object.values(STATUS),
    default: 1,
  },
});

Post.pre('save', function (next) {
  try {
    if (this.slug) next();

    this.slug = slugify(this.title);
    next();
  } catch (error) {
    next(error);
  }
});

Post.index({ title: 1 });

export default model('post', Post);
