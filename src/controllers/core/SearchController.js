import SearchService from '@/services/core/SearchService';

const SearchController = {
  async search(req, res, next) {
    try {
      const data = await SearchService.search(req.query);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default SearchController;
