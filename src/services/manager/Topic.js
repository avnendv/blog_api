import Topic from '@/models/Topic';
import { successResponse } from '@/utils';

const TopicService = {
  async list(data) {
    data = {};
    const topics = await Topic.find(data)
      .sort({ isShowTop: -1 })
      .select('title slug thumbnail description isShowTop status');

    return successResponse(topics);
  },
  async store(data) {
    const topic = await Topic.create(data);

    return successResponse(topic.toResource());
  },
  async update({ id, ...data }) {
    const topic = await Topic.findByIdAndUpdate(id, data, { new: true });

    if (!topic)
      throw {
        msg: 'Data not found!',
      };

    return successResponse(topic.toResource());
  },
  async destroy(id) {
    const data = await Topic.findByIdAndRemove(id);
    if (!data)
      throw {
        msg: 'Data not found!',
      };

    return successResponse();
  },
};

export default TopicService;
