import Post from '@/models/Post';
import Tag from '@/models/Tag';
import Topic from '@/models/Topic';
import User from '@/models/User';
import { limitExc, successResponse } from '@/utils';

const SearchService = {
  async search({ keyword = '' }) {
    if (!keyword.trim()) return successResponse(null);

    const [posts, tags, topics, authors] = await Promise.all([
      this.searchPost({ keyword }),
      this.searchTag({ keyword }),
      this.searchTopic({ keyword }),
      this.searchAuthor({ keyword }),
    ]);

    return successResponse({ posts, tags, topics, authors });
  },

  async searchPost({ limit = 3, keyword }) {
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

    return Post.find(filters)
      .sort({ updatedAt: -1 })
      .limit(limitExc(limit))
      .select('title slug thumbnail minRead updatedAt -_id');
  },

  async searchTag({ limit = 3, keyword }) {
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

    return Tag.find(filters).sort({ updatedAt: -1 }).limit(limitExc(limit)).select('name description -_id');
  },

  async searchTopic({ limit = 3, keyword }) {
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

    return Topic.find(filters)
      .sort({ updatedAt: -1 })
      .limit(limitExc(limit))
      .select('title slug thumbnail description -_id');
  },

  async searchAuthor({ limit = 3, keyword }) {
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

    return User.find(filters)
      .sort({ updatedAt: -1 })
      .limit(limitExc(limit))
      .select('userName fullName avatar email -_id');
  },
};

export default SearchService;
