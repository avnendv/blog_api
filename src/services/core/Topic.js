import Topic from '@/models/Topic';
import { limitExc, successResponse } from '@/utils';

const TopicService = {
  async list({ limit = 12 }) {
    const topics = await Topic.find()
      .sort({ isShowTop: -1, updatedAt: -1 })
      .limit(limitExc(limit))
      .select('title slug thumbnail description -_id');

    return successResponse(topics);
  },
};

export default TopicService;
