import { PER_PAGE } from '@/config/constants';
import Tag from '@/models/Tag';
import { successResponse } from '@/utils';

const TagService = {
  async list(data) {
    const { limit = PER_PAGE, page = 1, keyword = '' } = data;

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

    const [tags, totalDocs] = await Promise.all([
      await Tag.find(filters)
        .select('name description isShowTop status -_id')
        .sort({ isShowTop: -1 })
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit)),
      await Tag.countDocuments(filters),
    ]);

    const pagination = { limit, page, total: totalDocs, pages: Math.ceil(totalDocs / limit) };

    return successResponse(tags, pagination);
  },
  async store(data) {
    const tag = await Tag.create(data);

    return successResponse(tag.toResource());
  },
  async update({ id, ...data }) {
    const tag = await Tag.findOneAndUpdate({ name: id }, data, { new: true });

    if (!tag)
      throw {
        msg: 'Data not found!',
      };

    return successResponse(tag.toResource());
  },
  async destroy(name) {
    const data = await Tag.deleteOne({ name });
    if (data.deletedCount === 0)
      throw {
        msg: 'Data not found!',
      };

    return successResponse();
  },

  async insertOnNotExists(data, session) {
    if (data && Array.isArray(data)) {
      if (data.length) {
        const tags = [];
        for (let index = 0; index < data.length; index++) {
          const tagName = data[index];
          const tag = await Tag.exists({ name: tagName });
          !!tag || tags.push({ name: tagName });
        }
        !!tags.length && (await Tag.insertMany(tags, { session }));
      }
    }
  },
};

export default TagService;
