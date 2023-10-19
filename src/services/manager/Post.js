import mongoose from 'mongoose';
import { sanitize } from 'isomorphic-dompurify';
import TagService from './Tag';
import Post from '@/models/Post';
import { successResponse } from '@/utils';
import Tag from '@/models/Tag';
import PostInfo from '@/models/PostInfo';
import { PER_PAGE, POST_TYPE } from '@/config/constants';

const PostService = {
  async list(data) {
    const { limit = PER_PAGE, page = 1, keyword = '' } = data;

    const filters = {
      $or: [
        {
          title: { $regex: keyword, $options: 'i' },
        },
        {
          description: { $regex: keyword, $options: 'i' },
        },
      ],
    };

    const [posts, totalDocs] = await Promise.all([
      Post.find(filters)
        .sort({ isShowTop: -1 })
        .select('title thumbnail description publish status updatedAt')
        .populate('topic', 'title')
        .populate('series', 'title')
        .populate({
          path: 'tag',
          localField: 'tag',
          foreignField: 'name',
          select: '-_id name',
        })
        .populate('author', '-_id fullName'),
      Post.countDocuments(filters),
    ]);

    const pagination = { limit, page, total: totalDocs, pages: Math.ceil(totalDocs / limit) };

    return successResponse(posts, pagination);
  },
  async show(id) {
    const post = await Post.findById(id)
      .sort({ isShowTop: -1 })
      .select('-author -__v -viewed')
      .populate('series', 'title');

    return successResponse(post);
  },
  async store(data) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      await TagService.insertOnNotExists(data.tag, session);

      await this.checkSeries(data);

      const post = await new Post({ ...data, content: sanitize(data.content) });
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

      await TagService.insertOnNotExists(data.tag, session);

      await this.checkSeries(data, id);

      const post = await Post.findByIdAndUpdate(
        id,
        { ...data, content: sanitize(data.content) },
        { new: true, session }
      );

      if (!post)
        throw {
          msg: 'Data not found!',
        };
      await session.commitTransaction();
      session.endSession();

      return successResponse(post.toResource());
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      throw error;
    }
  },
  async destroy(id) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const [data] = await Promise.all([
        Post.findByIdAndRemove(id),
        Tag.updateMany({ post: id }, { $pull: { post: id } }, { multi: true }),
        PostInfo.deleteMany({ post: id }),
      ]);

      if (!data)
        throw {
          msg: 'Data not found!',
        };
      await session.commitTransaction();
      session.endSession();

      return successResponse();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      throw error;
    }
  },
  async upView(id) {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $inc: { viewed: 1 },
      },
      { new: true }
    );

    return !!post;
  },
  async seriesByAuthor(author) {
    const data = await Post.find({ postType: POST_TYPE.SERIES, author }).select('title');
    return successResponse(data);
  },
  async checkSeries(data, id = null) {
    if (data.postType && data.series) {
      if (data.series === id) throw { msg: 'Series and Post is equal' };
      if ([POST_TYPE.SERIES, POST_TYPE.POST].includes(data.postType)) delete data.series;
      else {
        const series = await Post.exists({ _id: data.series, postType: POST_TYPE.SERIES });

        if (!series) throw { msg: 'Series not exists' };
      }
    }
  },
};

export default PostService;
