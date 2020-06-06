import Article from "../../../server/models/Article";
import Comment from "../../../server/models/Comment";

export default {
  Query: {
    search: async (parent, { value }, context, info) => {
      const findCriteria = {
        body: { $regex: value, $options: "i" },
      };

      return [
        ...(await Article.find(findCriteria).exec()),
        ...(await Comment.find(findCriteria).exec()),
      ];
    },
  },
  SearchResult: {
    __resolveType: (data) => {
      return data.article ? "Comment" : "Article";
    },
  },
};
