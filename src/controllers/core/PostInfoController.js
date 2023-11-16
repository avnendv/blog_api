import { VOTE } from '@/config/constants';
import { markRequest, voteRequest } from '@/models/requests/PostInfo';
import PostInfoService from '@/services/core/PostInfo';
import ApiError from '@/utils/ApiError';

const PostInfoController = {
  async mark(req, res, next) {
    try {
      const { id } = req.params;

      const { error } = markRequest(req.body);
      if (error) throw new ApiError(error.details[0].message);

      const data = await PostInfoService.mark(id, '651d2e5853ac6188aa3f683d', req.body.mark);
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
      const data = await PostInfoService.vote(id, '651d2e5853ac6188aa3f683d', vote);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default PostInfoController;
