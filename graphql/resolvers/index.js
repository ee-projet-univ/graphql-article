import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User/";
import Article from "./Article/";
import Comment from "./Comment/";
import Search from "./Search/";

const resolvers = [User, Article, Comment, Search];

export default mergeResolvers(resolvers);
