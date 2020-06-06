export default `
  union SearchResult = Article|Comment
  type Query {
    search(value: String!): [SearchResult!]
  }
`;
