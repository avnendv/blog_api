import Tag from '@/models/Tag';
import { successResponse } from '@/utils';

const TagService = {
  async list({ keyword = '' }) {
    const filters = {
      $or: [
        {
          name: { $regex: keyword, $options: 'i' },
        },
        {
          description: { $regex: keyword, $options: 'i' },
        },
      ],
    };
    const tags = await Tag.find(filters).sort({ isShowTop: -1, updatedAt: -1 }).select('name');

    return successResponse(tags);
  },
};

export default TagService;
