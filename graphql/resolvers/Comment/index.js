import User from "../../../server/models/User";
import Article from "../../../server/models/Article";
import Comment from "../../../server/models/Comment";

export default {
  Query: {
    comment: async (parent, { _id }, context, info) => {
      return await Comment.find({ _id });
    },
    comments: async (parent, args, context, info) => {
      const res = await Comment.find({}).populate().exec();

      return res.map((u) => ({
        _id: u._id.toString(),
        body: u.body,
        author: u.author,
        article: u.article,
      }));
    },
  },
  Mutation: {
    createComment: async (parent, { comment }, context, info) => {
      const newComment = await new Comment({
        body: comment.body,
        author: comment.author,
        article: comment.article,
      });

      return new Promise((resolve, reject) => {
        newComment.save((err, res) => {
          if (err) {
            return reject(err);
          }

          resolve(
            Article.findByIdAndUpdate(
              res.article,
              { $push: { comments: res._id } },
              { new: true }
            ).exec((err) => {
              err ? reject(err) : resolve(res);
            })
          );
        });
      });
    },
    updateComment: async (parent, { _id, comment }, context, info) => {
      return new Promise((resolve, reject) => {
        Comment.findByIdAndUpdate(
          _id,
          { $set: { ...comment } },
          { new: true }
        ).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteComment: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Comment.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
  },
  Comment: {
    author: async ({ author }, args, context, info) => {
      return await User.findById({ _id: author });
    },
    article: async ({ article }, args, context, info) => {
      return await Article.findById(article);
    },
  },
};
