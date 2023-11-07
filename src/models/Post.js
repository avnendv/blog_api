import { Schema, model } from 'mongoose';
import { POST_TYPE, PUBLISH, STATUS } from '@/config/constants';
import { slugify } from '@/utils';

const Post = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      min: 6,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isShowTop: {
      type: Boolean,
      default: false,
    },
    thumbnail: String,
    description: String,
    content: String,
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
      default: POST_TYPE.POST,
    },
    series: { type: Schema.Types.ObjectId, ref: 'post' },
    attr: [
      {
        k: String,
        v: String,
      },
    ],
    tag: [{ type: String, ref: 'tag', field: 'name' }],
    topic: { type: Schema.Types.ObjectId, ref: 'topic', required: true },
    status: {
      type: Number,
      enum: Object.values(STATUS),
      default: STATUS.ENABLE,
    },
  },
  {
    timestamps: true,
  }
);

Post.pre('findOneAndUpdate', function (next) {
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
