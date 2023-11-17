import PostInfo from '@/models/PostInfo';
import { successResponse } from '@/utils';
import ApiError from '@/utils/ApiError';

const PostInfoService = {
  async info(postId, userId) {
    const postInfo = await PostInfo.findOne({
      post: postId,
      user: userId,
    });

    return successResponse(postInfo);
  },
  async mark(postId, userId, mark = true) {
    const postInfo = await PostInfo.findOneAndUpdate(
      {
        post: postId,
        user: userId,
      },
      {
        mark,
      },
      { new: true, upsert: true }
    );

    if (!postInfo) throw new ApiError('Data not found!');

    return successResponse();
  },
  async vote(postId, userId, voteType) {
    const postInfo = await PostInfo.findOneAndUpdate(
      {
        post: postId,
        user: userId,
      },
      {
        voteType,
      },
      { new: true, upsert: true }
    );

    if (!postInfo) throw new ApiError('Data not found!');

    return successResponse();
  },
};

export default PostInfoService;
