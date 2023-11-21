import { POST_TYPE } from '@/config/constants';
import Post from '@/models/Post';
import Tag from '@/models/Tag';
import Topic from '@/models/Topic';
import User from '@/models/User';
import { limitExc, successResponse } from '@/utils';
import ApiError from '@/utils/ApiError';

const PostService = {
  async show(slug) {
    const post = await Post.findOne({ slug })
      .select('-isShowTop -status -publish -attr')
      .populate('author', 'avatar fullName')
      .populate('topic', 'title slug')
      .populate('series', 'title');

    if (!post) throw new ApiError('Data not found!');
    Post.upView({ slug });

    return successResponse(post);
  },
  async postTrending({ limit = 3 }) {
    const posts = await Post.findTrending({ limit });
    return successResponse(posts);
  },
  async postList({ filters, limit, page, order, otherHandle }) {
    const limitReal = limitExc(limit);

    const [posts, totalDocs, other] = await Promise.all([
      Post.find(filters)
        .sort({ updatedAt: -1, ...order })
        .skip((parseInt(page) - 1) * parseInt(limitReal))
        .limit(limitReal)
        .select('title slug thumbnail minRead tag updatedAt -_id')
        .populate('author', 'avatar fullName'),
      Post.countDocuments(filters),
      otherHandle,
    ]);

    const pagination = {
      limit: limitReal,
      page,
      total: totalDocs,
      pages: Math.ceil(totalDocs / limitReal),
    };

    return [posts, pagination, other];
  },
  async postNewest({ limit = 6, page = 1 }) {
    const order = { isShowTop: -1 };

    return successResponse(...(await this.postList({ order, limit, page })));
  },
  async listPostByTag({ tag, limit = 6, page = 1 }) {
    const regex = { $regex: tag, $options: 'i' };
    const filters = { tag: regex };
    const otherHandle = Tag.findOne({ name: regex }).select('-_id name description');

    const [posts, pagination, tagInfo] = await this.postList({ filters, limit, page, otherHandle });
    return successResponse({ posts, tag: tagInfo }, pagination);
  },
  async listPostByTopic({ topic: keyword, limit = 6, page = 1 }) {
    const limitReal = limitExc(limit);

    const pipeline = [
      {
        $lookup: {
          from: 'topics',
          localField: 'topic',
          foreignField: '_id',
          as: 'topic',
        },
      },
      {
        $unwind: {
          path: '$topic',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          'topic.slug': keyword,
        },
      },
    ];

    const pipelineBase = [
      ...pipeline,
      {
        $project: {
          title: 1,
        },
      },
    ];

    const pipelineFilter = [
      ...pipeline,
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $unwind: {
          path: '$author',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          title: 1,
          slug: 1,
          thumbnail: 1,
          publish: 1,
          viewed: 1,
          minRead: 1,
          series: 1,
          tag: 1,
          updatedAt: 1,
          'author._id': 1,
          'author.avatar': 1,
          'author.fullName': 1,
        },
      },
    ];

    const [topic, posts, totalDocs] = await Promise.all([
      Topic.findOne({ slug: keyword }).select('-_id title slug thumbnail description'),
      Post.aggregate(pipelineFilter)
        .sort({ updatedAt: -1 })
        .skip((parseInt(page) - 1) * parseInt(limitReal))
        .limit(limitReal),
      Post.aggregate(pipelineBase).exec(),
    ]);

    const pagination = {
      limit: limitReal,
      page,
      total: totalDocs.length,
      pages: Math.ceil(totalDocs.length / limitReal),
    };

    return successResponse({ topic, posts }, pagination);
  },
  async listPostByAuthor({ author: keyword, limit = 6, page = 1 }) {
    const filters = { author: keyword };

    const limitReal = limitExc(limit);

    const [trending, posts, author, totalDocs] = await Promise.all([
      Post.findTrending({ limit: 3, filters }),
      Post.find(filters)
        .sort({ updatedAt: -1 })
        .skip((parseInt(page) - 1) * parseInt(limitReal))
        .limit(limitReal)
        .select('title slug thumbnail minRead tag updatedAt -_id')
        .populate('author', 'avatar fullName'),
      User.findById(keyword).select('avatar fullName'),
      Post.countDocuments(filters),
    ]);

    const pagination = {
      limit: limitReal,
      page,
      total: totalDocs,
      pages: Math.ceil(totalDocs / limitReal),
    };

    return successResponse({ trending, posts, author }, pagination);
  },
  async series({ limit = 12, page = 1 }) {
    const limitReal = limitExc(limit);
    const filters = { postType: POST_TYPE.SERIES };

    const [data, totalDocs] = await Promise.all([
      Post.find(filters)
        .sort({ updatedAt: -1 })
        .skip((parseInt(page) - 1) * parseInt(limitReal))
        .limit(limitReal)
        .select('title slug thumbnail minRead tag updatedAt -_id')
        .populate('author', 'avatar fullName'),
      Post.countDocuments(filters),
    ]);

    const pagination = {
      limit: limitReal,
      page,
      total: totalDocs,
      pages: Math.ceil(totalDocs / limitReal),
    };

    return successResponse(data, pagination);
  },
  async postSeries(id) {
    const postSeries = await Post.find({ postType: POST_TYPE.POST_SERIES, series: id }).select('title slug -_id');

    return successResponse(postSeries);
  },
};

export default PostService;
