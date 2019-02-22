import User from "../../../server/models/User";
import Article from "../../../server/models/Article";
import Comment from "../../../server/models/Comment";

export default {
  Query: {
    user: async (parent, { _id }, context, info) => {
      return await User.findOne({ _id }).exec();
    },
    users: async (parent, args, context, info) => {
      const users = await User.find({})
        .populate()
        .exec();

      return users.map(u => ({
        _id: u._id.toString(),
        username: u.username,
        email: u.email,
        bio: u.bio,
        image: u.image,
        articles: u.articles,
        favorites: u.favorites,
        following: u.following,
        comments: u.comments
      }));
    }
  },
  Mutation: {
    createUser: async (parent, { user }, context, info) => {
      var newUser = new User();

      newUser.username = user.username;
      newUser.email = user.email;
      newUser.setPassword(user.password);

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateUser: async (parent, { _id, user }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteUser: async (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  },
  User: {
    articles: async ({ _id }, args, context, info) => {
      return await Article.find({ author: _id });
    },
    comments: async ({ _id }, args, context, info) => {
      return await Comment.find({ author: _id });
    }
  }
};
