import Topic from '@/models/Topic';
import { successResponse } from '@/utils';

const TopicService = {
  async list() {
    const topics = await Topic.find().sort({ isShowTop: -1, updatedAt: -1 }).select('title slug thumbnail description');

    return successResponse(topics);
  },
};

export default TopicService;
