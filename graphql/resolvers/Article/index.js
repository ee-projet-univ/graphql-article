import User from "../../../server/models/User";
import Article from "../../../server/models/Article";
import Comment from "../../../server/models/Comment";

export default {
  Query: {
    article: async (parent, { _id }, context, info) => {
      return await Article.findOne({ _id }).exec();
    },
    articles: async (parent, args, context, info) => {
      const res = await Article.find({})
        .populate()
        .exec();

      return res.map(u => ({
        _id: u._id.toString(),
        slug: u.slug,
        title: u.title,
        description: u.description,
        body: u.body,
        tagList: u.tagList,
        author: u.author,
        comments: u.comments
      }));
    }
  },
  Mutation: {
    createArticle: async (parent, { article }, context, info) => {
      const newArticle = await new Article({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
        author: article.author
      });

      return new Promise((resolve, reject) => {
        newArticle.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateArticle: async (parent, { _id, article }, context, info) => {
      return new Promise((resolve, reject) => {
        Article.findByIdAndUpdate(_id, { $set: { ...article } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteArticle: (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Article.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  Article: {
    author: async ({ author }, args, context, info) => {
      return await User.findById(author);
    },
    comments: async ({ author }, args, context, info) => {
      return await Comment.find({ author });
    }
  }
};
