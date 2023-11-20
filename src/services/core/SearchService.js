import Post from '@/models/Post';
import Tag from '@/models/Tag';
import Topic from '@/models/Topic';
import User from '@/models/User';
import { limitExc, successResponse } from '@/utils';

const SearchService = {
  async search({ keyword = '', limit, page }) {
    if (!keyword.trim()) return successResponse(null);

    const [posts, tags, topics, authors] = await Promise.all([
      this.searchPost({ keyword, limit, page }),
      this.searchTag({ keyword, limit, page }),
      this.searchTopic({ keyword, limit, page }),
      this.searchAuthor({ keyword, limit, page }),
    ]);

    return successResponse({ posts, tags, topics, authors });
  },

  async searchPost({ limit = 3, keyword, page = 1 }) {
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

    const limitReal = limitExc(limit);

    return Post.find(filters)
      .sort({ updatedAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limitReal))
      .limit(limitReal)
      .select('title slug thumbnail minRead updatedAt -_id');
  },

  async searchTag({ limit = 3, keyword, page = 1 }) {
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

    const limitReal = limitExc(limit);

    return Tag.find(filters)
      .sort({ updatedAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limitReal))
      .limit(limitReal)
      .select('name description -_id');
  },

  async searchTopic({ limit = 3, keyword, page = 1 }) {
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

    const limitReal = limitExc(limit);

    return Topic.find(filters)
      .sort({ updatedAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limitReal))
      .limit(limitReal)
      .select('title slug thumbnail description -_id');
  },

  async searchAuthor({ limit = 3, keyword, page = 1 }) {
    const filters = {
      $or: [
        {
          userName: { $regex: keyword, $options: 'i' },
        },
        {
          fullName: { $regex: keyword, $options: 'i' },
        },
        {
          email: { $regex: keyword, $options: 'i' },
        },
      ],
    };

    const limitReal = limitExc(limit);

    return User.find(filters)
      .sort({ updatedAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limitReal))
      .limit(limitReal)
      .select('fullName avatar email');
  },
};

export default SearchService;
