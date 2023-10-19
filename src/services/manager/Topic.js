import { PER_PAGE } from '@/config/constants';
import Topic from '@/models/Topic';
import { successResponse } from '@/utils';

const TopicService = {
  async list(data) {
    const { limit = PER_PAGE, page = 1, keyword = '' } = data;

    const filters = {
      $or: [
        {
          title: { $regex: keyword, $options: 'i' },
        },
        {
          description: { $regex: keyword, $options: 'i' },
        },
      ],
    };

    const [topics, totalDocs] = await Promise.all([
      Topic.find(filters).sort({ isShowTop: -1 }).select('title slug thumbnail description isShowTop status'),
      Topic.countDocuments(filters),
    ]);

    const pagination = { limit, page, total: totalDocs, pages: Math.ceil(totalDocs / limit) };

    return successResponse(topics, pagination);
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
