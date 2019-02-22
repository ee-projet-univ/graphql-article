export default `
  type User {
    _id: String!
    username: String!
    email: String!
    bio: String!
    image: String!
    password: String!
    favorites: [Article!]!
    following: [Article!]!
    articles: [Article!]!
    comments: [Comment!]!
  }

  type Query {
    user(_id: ID!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(user: CreateUserInput): User!
    updateUser(_id: String!, user: UpdateUserInput!): User!
    deleteUser(_id: String!): User!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }
  
  input UpdateUserInput {
    username: String
    email: String
    image: String
    bio: String
  } 
`;
