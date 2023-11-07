import Post from '@/models/Post';
import { successResponse } from '@/utils';

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
  async listPostByTag(tag) {
    const posts = await Post.find({ tag: { $regex: tag, $options: 'i' } });

    if (!posts)
      throw {
        msg: 'Data not found!',
      };

    return successResponse(posts);
  },
  async listPostByTopic(keyword) {
    const posts = await Post.aggregate([
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
          'topic.title': { $regex: keyword, $options: 'i' },
        },
      },
      {
        $project: {
          title: 1,
          slug: 1,
          thumbnail: 1,
          description: 1,
          content: 1,
          publish: 1,
          author: 1,
          viewed: 1,
          postType: 1,
          series: 1,
          tag: 1,
          'topic.title': 1,
          'topic.slug': 1,
        },
      },
    ]);

    if (!posts)
      throw {
        msg: 'Data not found!',
      };

    return successResponse(posts);
  },
};

export default PostService;
