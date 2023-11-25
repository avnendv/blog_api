import { PER_PAGE } from '@/config/constants';
import Post from '@/models/Post';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';
// import PostInfo from '@/models/PostInfo';
import { limitExc, successResponse } from '@/utils';

// query postBookmark 2
// const postBookmark = await PostInfo.aggregate([
//   {
//     $match: {
//       user: userId,
//     },
//   },
//   {
//     $lookup: {
//       from: 'posts',
//       localField: 'post',
//       foreignField: '_id',
//       as: 'post',
//     },
//   },
//   {
//     $unwind: {
//       path: '$post',
//       preserveNullAndEmptyArrays: false,
//     },
//   },
//   {
//     $lookup: {
//       from: 'users',
//       localField: 'post.author',
//       foreignField: '_id',
//       as: 'author',
//     },
//   },
//   {
//     $unwind: {
//       path: '$author',
//       preserveNullAndEmptyArrays: false,
//     },
//   },
//   {
//     $project: {
//       title: '$post.title',
//       slug: '$post.slug',
//       thumbnail: '$post.thumbnail',
//       publish: '$post.publish',
//       viewed: '$post.viewed',
//       minRead: '$post.minRead',
//       series: '$post.series',
//       tag: '$post.tag',
//       updatedAt: '$post.updatedAt',
//       'author._id': 1,
//       'author.avatar': 1,
//       'author.fullName': 1,
//     },
//   },
// ]);

const AccountService = {
  async personal(userId) {
    const user = await User.findById(userId).select('userName bio fullName birthday phone avatar email gender address');

    return successResponse(user);
  },
  async social(userId) {
    const userProfile = await UserProfile.findOne({ user: userId }).select(
      'url googleUrl facebookUrl githubUrl socialOther1 socialOther2 socialOther3'
    );

    return successResponse(userProfile);
  },
  async bookmark({ userId, limit = 12, page = 1 }) {
    const limitReal = limitExc(limit);

    const basePipeline = [
      {
        $lookup: {
          from: 'postinfos',
          localField: '_id',
          foreignField: 'post',
          as: 'postInfo',
        },
      },
      {
        $match: {
          'postInfo.user': userId,
        },
      },
      {
        $unwind: {
          path: '$postInfo',
          preserveNullAndEmptyArrays: false,
        },
      },
    ];

    const [postBookmark, totalDocs] = await Promise.all([
      Post.aggregate([
        ...basePipeline,
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
      ])
        .sort({ updatedAt: -1 })
        .skip((parseInt(page) - 1) * parseInt(limitReal))
        .limit(limitReal),
      Post.aggregate([
        ...basePipeline,
        {
          $project: {
            title: 1,
          },
        },
      ]),
    ]);

    const total = totalDocs?.length ?? 0;

    const pagination = {
      limit: limitReal,
      page,
      total,
      pages: Math.ceil(total / limitReal),
    };

    return successResponse(postBookmark, pagination);
  },
  async listPost({ limit = PER_PAGE, page = 1, userId: author, publish }) {
    const [posts, totalDocs] = await Promise.all([
      Post.find({ author, publish })
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .sort({ isShowTop: -1 })
        .select('title slug tag publish isApproved updatedAt')
        .populate('topic', 'title slug'),
      Post.countDocuments({ author, publish }),
    ]);

    const pagination = { limit, page, total: totalDocs, pages: Math.ceil(totalDocs / limit) };

    return successResponse(posts, pagination);
  },
  async togglePublish({ id, publish, author }) {
    console.log(111);
    await Post.findOneAndUpdate({ _id: id, author }, { publish: +publish });

    return successResponse();
  },
};

export default AccountService;
