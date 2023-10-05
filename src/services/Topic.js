import Topic from '@/models/Topic';
import { successResponse } from '@/utils';

const TopicService = {
  async list(data) {
    const tags = await Topic.find(data).sort({ isShowTop: -1 }).select('title slug thumbnail description status');

    return successResponse(tags);
  },
  async store(data) {
    const tag = await Topic.create(data);

    return successResponse(tag.toResource());
  },
  async update({ id, ...data }) {
    const tag = await Topic.findByIdAndUpdate(id, data, { new: true });

    if (!tag)
      throw {
        msg: 'Data not found!',
      };

    return successResponse(tag.toResource());
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
