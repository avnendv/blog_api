import { Schema, model } from 'mongoose';
import Tag from './Tag';
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

Post.pre('save', async function (next) {
  try {
    this.model('tag')
      .updateMany({ name: { $nin: this.tag } }, { $pull: { post: this._id } })
      .exec();

    this.model('tag')
      .updateMany({ name: { $in: this.tag } }, { $addToSet: { post: this._id } })
      .exec();

    if (this.slug) {
      this.slug = slugify(this.slug);
      next();
    }
    this.slug = slugify(this.title);
    next();
  } catch (error) {
    next(error);
  }
});

Post.pre('findOneAndUpdate', async function (next) {
  try {
    Tag.updateMany({ name: { $nin: this._update.tag } }, { $pull: { post: this._conditions._id } }).exec();

    Tag.updateMany({ name: { $in: this._update.tag } }, { $addToSet: { post: this._conditions._id } }).exec();

    if (this._update.slug) {
      this._update.slug = slugify(this._update.slug);
      next();
    }
    this._update.slug = slugify(this._update.title);
    next();
  } catch (error) {
    next(error);
  }
});

Post.pre('findOneAndRemove', async function (next) {
  try {
    await Tag.updateMany({ post: this._conditions._id }, { $pull: { post: this._conditions._id } }, { multi: true });

    next();
  } catch (error) {
    next(error);
  }
});

Post.methods.toResource = function () {
  return {
    title: this.title,
    slug: this.slug,
    thumbnail: this.thumbnail,
    description: this.description,
    content: this.content,
    isShowTop: this.isShowTop,
    status: this.status,
  };
};

Post.index({ title: 1 });

export default model('post', Post);
