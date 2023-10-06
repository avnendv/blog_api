import PostInfo from '@/models/PostInfo';
import { successResponse } from '@/utils';

const PostInfoService = {
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

    if (!postInfo)
      throw {
        msg: 'Data not found!',
      };

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

    if (!postInfo)
      throw {
        msg: 'Data not found!',
      };

    return successResponse();
  },
};

export default PostInfoService;
