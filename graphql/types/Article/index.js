export default `
  type Article {
    _id: ID!
    slug: String!
    title: String!
    description: String!
    body: String!
    tagList: [String!]!
    favoritesCount: Int!
    author: User!
    comments: [Comment!]!
  }

  type Query {
    article(_id: ID!): Article!
    articles: [Article!]!
  }

  type Mutation {
    createArticle(article: CreateArticleInput): Article!
    updateArticle(_id: ID!, article: UpdateArticleInput): Article!
    deleteArticle(_id: ID!): Article!
  }

  input CreateArticleInput {
    title: String!
    description: String!
    body: String!
    tagList: [String!]!
    author: ID!
  }
  
  input UpdateArticleInput {
    title: String
    description: String
    body: String
    tagList: [String!]
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;
