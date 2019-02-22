export default `
  type Comment {
    _id: ID!
    body: String!
    author: User!
    article: Article!
  }

  type Query {
    comment(_id: ID!): [Comment!]!
    comments: [Comment!]!
  }

  type Mutation {
    createComment(comment: CreateCommentInput!): Comment!
    updateComment(_id: ID!, comment: UpdateCommentInput): Comment!
    deleteComment(_id: ID!): Comment!
  }

  input CreateCommentInput {
    body: String!
    article: ID!
    author: ID!
  }
  
  input UpdateCommentInput {
    body: String
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;
