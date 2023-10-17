import { Schema, model } from 'mongoose';
import Post from './Post';
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
  post: [{ type: Schema.Types.ObjectId, ref: 'post' }],
});

Tag.pre('save', function (next) {
  this.model('post')
    .updateMany({ _id: { $nin: this.post } }, { $pull: { tag: this.name } })
    .exec();

  this.model('post')
    .updateMany({ _id: { $in: this.post } }, { $addToSet: { tag: this.name } })
    .exec();

  next();
});

Tag.pre('findOneAndRemove', async function (next) {
  try {
    await Post.updateMany({ tag: this._conditions._id }, { $pull: { tag: this._conditions._id } }, { multi: true });

    next();
  } catch (error) {
    next(error);
  }
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
