import mongoose from 'mongoose';
import TagService from './Tag';
import Post from '@/models/Post';
import { successResponse } from '@/utils';

const PostService = {
  async list(data) {
    const posts = await Post.find(data).sort({ isShowTop: -1 }).select('title slug thumbnail description status');

    return successResponse(posts);
  },
  async store(data) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const dataStore = {
        ...data,
        author: '651d2e5853ac6188aa3f683d',
      };
      await TagService.insertOnNotExists(data.tag, session);

      const post = await new Post(dataStore);
      await post.save({
        session,
        new: true,
      });

      await session.commitTransaction();
      session.endSession();

      return successResponse(post.toResource());
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      throw error;
    }
  },
  async update({ id, ...data }) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const dataUpdate = {
        ...data,
        author: '651d2e5853ac6188aa3f683d',
      };
      await TagService.insertOnNotExists(data.tag, session);
      const post = await Post.findByIdAndUpdate(id, dataUpdate, { new: true, session });

      await session.commitTransaction();
      session.endSession();

      if (!post)
        throw {
          msg: 'Data not found!',
        };

      return successResponse(post.toResource());
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      throw error;
    }
  },
  async destroy(id) {
    const data = await Post.findByIdAndRemove(id);
    console.log(data, 222);
    if (!data)
      throw {
        msg: 'Data not found!',
      };

    return successResponse();
  },
};

export default PostService;
