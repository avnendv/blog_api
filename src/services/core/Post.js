import Post from '@/models/Post';
import { limitExc, successResponse } from '@/utils';

const PostService = {
  async show(slug) {
    const post = await Post.findOne({ slug })
      .sort({ isShowTop: -1 })
      .select('-isShowTop -status -publish -attr')
      .populate('topic', 'title slug')
      .populate('series', 'title');

    if (!post)
      throw {
        msg: 'Data not found!',
      };

    return successResponse(post);
  },
  async postTrending({ limit = 3 }) {
    const posts = await Post.find({ isShowTop: true })
      .sort({ viewed: -1 })
      .limit(limitExc(limit))
      .select('title slug thumbnail minRead updatedAt -_id');

    return successResponse(posts);
  },
  async postList({ filters, limit, page, order }) {
    const limitReal = limitExc(limit);

    const [posts, totalDocs] = await Promise.all([
      Post.find(filters)
        .sort({ updatedAt: -1, ...order })
        .limit(limitExc(limitReal))
        .select('title slug thumbnail minRead updatedAt -_id')
        .populate('author', 'avatar fullName'),
      Post.countDocuments(filters),
    ]);

    const pagination = {
      limit: limitReal,
      page,
      total: totalDocs,
      pages: Math.ceil(totalDocs / limitReal),
    };

    return [posts, pagination];
  },
  async postNewest({ limit = 6, page = 1 }) {
    const order = { isShowTop: -1 };

    return successResponse(...(await this.postList({ order, limit, page })));
  },
  async listPostByTag({ tag, limit = 6, page = 1 }) {
    const filters = { tag: { $regex: tag, $options: 'i' } };

    return successResponse(...(await this.postList({ filters, limit, page })));
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
          'author._id': 1,
          'author.avatar': 1,
          'author.fullName': 1,
          // 'topic.title': 1,
          // 'topic.slug': 1,
        },
      },
    ];

    const [posts, totalDocs] = await Promise.all([
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

    return successResponse(posts, pagination);
  },
};

export default PostService;
