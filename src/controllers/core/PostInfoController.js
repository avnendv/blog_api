import { VOTE } from '@/config/constants';
import { markRequest, voteRequest } from '@/models/requests/PostInfo';
import PostInfoService from '@/services/core/PostInfo';
import ApiError from '@/utils/ApiError';

const PostInfoController = {
  async info(req, res, next) {
    try {
      const { id } = req.params;

      const data = await PostInfoService.info(id, req.user._id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async mark(req, res, next) {
    try {
      const { id } = req.params;

      const { error } = markRequest(req.body);
      if (error) throw new ApiError(error.details[0].message);

      const data = await PostInfoService.mark(id, req.user._id, req.body.mark);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async vote(req, res, next) {
    try {
      const { id } = req.params;

      const { error } = voteRequest(req.body);
      if (error) throw new ApiError(error.details[0].message);

      const vote = [VOTE.DISLIKE, VOTE.LIKE].includes(+req.body.vote) ? +req.body.vote : VOTE.NO_VOTE;
      const data = await PostInfoService.vote(id, req.user._id, vote);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default PostInfoController;
